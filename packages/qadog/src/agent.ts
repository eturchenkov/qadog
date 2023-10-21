require("dotenv").config();
import { readFile } from "fs/promises";
import puppeteer from "puppeteer";
import { gpt } from "./gpt";

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
You should find element selector for document.querySelector function that according description below:
-----
${instruction}
-----
Write only unique selector as response.
Write only NO if you can't find such element.
Response should be a one line.
`,
    0.3
  );
  return response;
};

(async () => {
  const data = await readFile("src/instructions.json", { encoding: "utf8" });
  const instructions = JSON.parse(data)?.instructions ?? [];

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 800 });

  await page.goto("http://localhost:3000/");
  const bodyHTML = await page.evaluate(() => document.body.innerHTML);
  const query = await findQuery(bodyHTML, instructions[0]);
  console.log(query);

  await browser.close();
})();
