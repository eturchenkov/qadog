import { readFile } from "fs/promises";
import puppeteer from "puppeteer";
import { gpt } from "./gpt";
import type { ElementHandle } from "puppeteer";

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

  let element: ElementHandle | null = null;
  let i: number = 1;
  for (const instruction of instructions) {
    const bodyHTML = await page.evaluate(() => document.body.innerHTML);

    if (instruction.startsWith("[find]")) {
      const query = await findQuery(bodyHTML, instruction);
      console.log(`find! ${query}`);
      element = await page.waitForSelector(query);
    } else if (instruction.startsWith("[click]")) {
      console.log(`click! ${instruction}, ${Boolean(element)}`);
      await element?.click();
      await page.screenshot({
        path: `files/reports/${appName}/${i}.jpg`,
        type: "jpeg",
      });
      i++;
    } else if (instruction.startsWith("[type]")) {
      console.log(`type! ${instruction}, ${Boolean(element)}`);
      await element?.type(instruction.replace("[type]", ""));
      await page.screenshot({
        path: `files/reports/${appName}/${i}.jpg`,
        type: "jpeg",
      });
      i++;
    }
  }

  await browser.close();
};
