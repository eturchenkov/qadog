require("dotenv").config();
import { readFile, writeFile } from "fs/promises";
import { gpt } from "./gpt";

const getInstructions = async (userStory: string): Promise<string[]> => {
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

(async () => {
  const data = await readFile("src/user-stories.json", { encoding: "utf8" });
  const userStories = JSON.parse(data)?.userStories ?? [];

  const instructions = await getInstructions(userStories[0]);
  writeFile("src/instructions.json", JSON.stringify({ instructions }), {
    encoding: "utf8",
  });
})();
