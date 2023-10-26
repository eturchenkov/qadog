require("dotenv").config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { readFile } from "fs/promises";
import { addInstruction } from "./instructor";
import { addReport } from "./inspector";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/stories", async (_, res) => {
  const epic = await readFile(`stories/todo/stories.json`, {
    encoding: "utf8",
  });
  res.send(epic);
});

app.post("/stories/:si/instructions", async (req, res) => {
  const si = parseInt(req.params.si);
  res.json(await addInstruction(si));
});

app.post("/stories/:si/instructions/:ii/reports", async (req, res) => {
  const si = parseInt(req.params.si);
  const ii = parseInt(req.params.ii);
  res.json(await addReport(si, ii));
});

app.listen(process.env.PORT || 3000);
