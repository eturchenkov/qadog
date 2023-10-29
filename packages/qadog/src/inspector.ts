import puppeteer from "puppeteer";
import { readFile, writeFile, mkdir } from "fs/promises";
import { gpt } from "./gpt";
import { genId } from "./utils";
import type { Page } from "puppeteer";
import type { Epic } from "./types/epic";
import type { Report } from "./types/report";

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

export const inspectStory = async (
  appName: string,
  si: number,
  ii: number,
  url: string
): Promise<{ reportId: string; report: Report }> => {
  const data = await readFile(`files/${appName}/stories.json`, {
    encoding: "utf8",
  });
  const epic = JSON.parse(data) as Epic;
  const instructions = epic.stories[si].instructions[ii].steps;

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 800 });
  await page.goto(url);

  let element: string = "";
  let i: number = 1;
  const reportId = genId();
  const report: Report = { steps: [], id: reportId };
  await mkdir(`files/${appName}/reports/${reportId}`);
  for (const instruction of instructions) {
    const bodyHTML = await page.evaluate(() => document.body.innerHTML);

    if (instruction.startsWith("[find]")) {
      const query = await findQuery(bodyHTML, instruction);
      element = (await page.waitForSelector(query)) ? query : "";

      const removeOutline = await outlineElement(page, element);
      await page.screenshot({
        path: `files/${appName}/reports/${reportId}/${i}.jpg`,
        type: "jpeg",
      });
      await removeOutline();
      report.steps.push({
        type: "find",
        selector: element,
        screenshot: `${i}.jpg`,
      });
    } else if (element && instruction.startsWith("[click]")) {
      await page.click(element);
      await page.screenshot({
        path: `files/${appName}/reports/${reportId}/${i}.jpg`,
        type: "jpeg",
      });
      report.steps.push({
        type: "click",
        screenshot: `${i}.jpg`,
      });
    } else if (element && instruction.startsWith("[type]")) {
      const text = instruction.replace("[type]", "");
      await page.type(element, text);
      await page.screenshot({
        path: `files/${appName}/reports/${reportId}/${i}.jpg`,
        type: "jpeg",
      });
      report.steps.push({
        type: "type",
        text,
        screenshot: `${i}.jpg`,
      });
    }
    i++;
  }

  await browser.close();
  await writeFile(
    `files/${appName}/reports/${reportId}/report.json`,
    JSON.stringify(report),
    { encoding: "utf8" }
  );
  return { reportId, report };
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
  const data = await readFile(`files/todo/stories.json`, {
    encoding: "utf8",
  });
  const epic = JSON.parse(data) as Epic;
  const { reportId, report } = await inspectStory("todo", si, ii, epic.url);

  epic.stories[si].instructions[ii].reports = [
    ...epic.stories[si].instructions[ii].reports,
    { id: reportId, createdAt: new Date().getTime() },
  ];
  await writeFile(`files/todo/stories.json`, JSON.stringify(epic), {
    encoding: "utf8",
  });
  return epic;
};
