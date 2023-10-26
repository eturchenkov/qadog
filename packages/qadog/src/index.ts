require("dotenv").config();
import { buildInstructions } from "./instructor";
import { inspectStory } from "./inspector";

const appName = "todo";
const url = "http://localhost:3000/";

(async () => {
  const arg = process.argv[2];
  if (arg !== "inspect") {
    await buildInstructions(appName);
  }
  if (arg !== "instruct") {
    // await inspectStory(appName, url);
  }
})();
