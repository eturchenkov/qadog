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
  (store: Store): Store => ({
    epic: {
      ...store.epic,
      stories: store.epic.stories.map((story, s_i) => ({
        ...story,
        instructions: story.instructions.map((instruction, i_i) => ({
          ...instruction,
          reports: instruction.reports.map((report, r_i) => ({
            ...report,
            selected: s_i === si && i_i === ii && r_i === ri,
          })),
        })),
      })),
    },
    report: {
      ...report,
      steps: report.steps.map((step) => ({
        ...step,
        folded: true,
        logs: step.logs.map((log) => ({
          text: log,
          folded: true,
        })),
      })),
    },
  });

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

export const toggleStepLog =
  (si: number, li: number) =>
  (store: Store): Store => ({
    ...store,
    report: {
      ...store.report,
      steps: store.report.steps.map((step, s_i) => ({
        ...step,
        logs:
          s_i === si
            ? step.logs.map((log, l_i) => ({
                ...log,
                folded: l_i === li ? !log.folded : log.folded,
              }))
            : step.logs,
      })),
    },
  });
