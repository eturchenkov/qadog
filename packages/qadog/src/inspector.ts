import { readFile, writeFile } from "fs/promises";
import puppeteer from "puppeteer";
import { gpt } from "./gpt";
import type { Page } from "puppeteer";
import type { Epic } from "./types/epic";

const findQuery = async (
  body: string,
  instruction: string
): Promise<string> => {
  const response = await gpt(
    `You are HTML DOM element finder.
You have a html body:
-----
${body}
-----
You should find element selector (as string) for document.querySelector function that according description below:
-----
${instruction}
-----
Write only unique selector as response.
Write only NO if you can't find such element.
Response should be a one line.
`,
    0.3
  );
  console.log(`find response: ${response}`);
  return response;
};

export const inspectStory = async (appName: string, url: string) => {
  const data = await readFile(`files/reports/${appName}/instructions.json`, {
    encoding: "utf8",
  });
  const instructions = JSON.parse(data)?.instructions ?? [];

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 800 });
  await page.goto(url);

  let element: string = "";
  let i: number = 1;
  for (const instruction of instructions) {
    const bodyHTML = await page.evaluate(() => document.body.innerHTML);

    if (instruction.startsWith("[find]")) {
      const query = await findQuery(bodyHTML, instruction);
      console.log(`find! ${query}`);
      element = (await page.waitForSelector(query)) ? query : "";
    } else if (element && instruction.startsWith("[click]")) {
      console.log(`click! ${instruction}, ${Boolean(element)}`);

      const removeOutline = await outlineElement(page, element);
      await page.click(element);
      await page.screenshot({
        path: `files/reports/${appName}/${i}.jpg`,
        type: "jpeg",
      });
      await removeOutline();
      i++;
    } else if (element && instruction.startsWith("[type]")) {
      console.log(`type! ${instruction}, ${Boolean(element)}`);

      const removeOutline = await outlineElement(page, element);
      await page.type(element, instruction.replace("[type]", ""));
      await page.screenshot({
        path: `files/reports/${appName}/${i}.jpg`,
        type: "jpeg",
      });
      await removeOutline();
      i++;
    }
  }

  await browser.close();
};

const outlineElement = async (
  page: Page,
  element: string
): Promise<Function> => {
  // add storing prev outline style
  await page.evaluate((element) => {
    const el = document.querySelector(element) as HTMLElement;
    if (el) el.style.outline = "2px solid red";
  }, element);
  return async () => {
    await page.evaluate((element) => {
      const el = document.querySelector(element) as HTMLElement;
      if (el) el.style.outline = "";
    }, element);
  };
};

export const addReport = async (si: number, ii: number): Promise<Epic> => {
  const data = await readFile(`stories/todo/stories.json`, {
    encoding: "utf8",
  });
  const epic = JSON.parse(data) as Epic;

  // buildReport(epic.stories[si].instructions[ii].steps);
  epic.stories[si].instructions[ii].reports = [
    ...epic.stories[si].instructions[ii].reports,
    { id: "new" },
  ];
  // write report file
  await writeFile(`stories/todo/stories.json`, JSON.stringify(epic), {
    encoding: "utf8",
  });
  return epic; // and report
};
