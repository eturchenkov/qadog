import { agent } from "./agent";
import { cleanEpic } from "@/store/utils";
import type { Epic } from "@/types/epic";
import type { Report } from "@/types/report";

export const service = {
  getEpic: () => agent("GET", "/stories") as Promise<Epic>,
  updateEpic: (epic: State.Epic) =>
    agent("PUT", "/stories", cleanEpic(epic)) as Promise<Epic>,
  addInstruction: (si: number) =>
    agent("POST", `/stories/${si}/instructions`) as Promise<Epic>,
  addReport: (si: number, ii: number) =>
    agent("POST", `/stories/${si}/instructions/${ii}/reports`) as Promise<Epic>,
  getReport: (id: string) => agent("GET", `/reports/${id}`) as Promise<Report>,
};
