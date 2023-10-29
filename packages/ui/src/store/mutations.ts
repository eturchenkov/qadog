import type { Epic } from "@/types/epic";
import type { Report } from "@/types/report";
import type { Store } from "@/types/store";

export const updateEpic =
  (epic: Epic) =>
  (store: Store): Store => ({
    ...store,
    epic: {
      ...epic,
      stories: epic.stories.map((story) => ({
        ...story,
        instructions: story.instructions.map((instruction) => ({
          ...instruction,
          reports: instruction.reports.map((report) => ({
            ...report,
            selected: false,
          })),
        })),
      })),
    },
  });

export const updateReport =
  (report: Report, si: number, ii: number, ri: number) =>
  (store: Store): Store => {
    store.epic.stories[si].instructions[ii].reports[ri].selected = true;
    return {
      ...store,
      report: {
        ...report,
        steps: report.steps.map((step) => ({
          ...step,
          folded: true,
        })),
      },
    };
  };

export const toggleReportStep =
  (si: number) =>
  (store: Store): Store => ({
    ...store,
    report: {
      ...store.report,
      steps: store.report.steps.map((step, i) => ({
        ...step,
        folded: i === si ? !step.folded : step.folded,
      })),
    },
  });
