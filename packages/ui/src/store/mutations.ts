import type { Epic } from "@/types/epic";
import type { Report } from "@/types/report";
import type { Store } from "@/types/store";

export const updateEpic =
  (epic: Epic) =>
  (store: Store): Store => ({
    ...store,
    epic,
  });

export const updateReport =
  (report: Report) =>
  (store: Store): Store => ({
    ...store,
    report,
  });
