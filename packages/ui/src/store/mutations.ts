import type { Epic } from "@/types/epic";
import type { Store } from "@/types/store";

export const updateEpic =
  (epic: Epic) =>
  (store: Store): Store => ({
    ...store,
    epic,
  });
