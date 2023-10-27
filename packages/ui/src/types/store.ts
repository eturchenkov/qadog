import type { Epic } from "./epic";
import type { Report } from "./report";

export type Store = {
  epic: Epic | null;
  report: Report;
};
