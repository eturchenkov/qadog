import { readFile, writeFile } from "fs/promises";
import { gpt } from "./gpt";
import type { Epic } from "./types/epic";

const getInstruction = async (userStory: string): Promise<string[]> => {
  const response = await gpt(
    `You have a user story:
-----
${userStory}
-----
Write step chain to implement this user story above.
Example here:
----
User can login to website. To do this he type his email to email field, type his password to password field and press button "Login".
----
[find] email field
[type] email
[find] password field
[type] password
[find] login button
[click] login button
`
  );
  return response.split("\n");
};

export const buildInstructions = async (appName: string) => {
  const data = await readFile(`files/stories/${appName}.json`, {
    encoding: "utf8",
  });
  const userStories = JSON.parse(data)?.userStories ?? [];

  const instructions = await getInstruction(userStories[0]);
  writeFile(
    `files/reports/${appName}/instructions.json`,
    JSON.stringify({ instructions }),
    {
      encoding: "utf8",
    }
  );
};

export const addInstruction = async (si: number): Promise<Epic> => {
  const data = await readFile(`files/todo/stories.json`, {
    encoding: "utf8",
  });
  const epic = JSON.parse(data) as Epic;

  const steps = await getInstruction(epic.stories[si].text);
  epic.stories[si].instructions = [
    ...epic.stories[si].instructions,
    {
      steps,
      reports: [],
    },
  ];
  await writeFile(`files/todo/stories.json`, JSON.stringify(epic), {
    encoding: "utf8",
  });
  return epic;
};
