import type { Epic } from "./epic";

export type Store = {
  epic: Epic | null;
  report: string[];
};
