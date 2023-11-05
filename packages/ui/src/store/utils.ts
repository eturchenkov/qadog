import { Epic } from "@/types/epic";

export const cleanEpic = (epic: State.Epic): Epic => ({
  ...epic,
  stories: epic.stories.map((story) => ({
    ...story,
    instructions: story.instructions.map((instruction) => ({
      ...instruction,
      reports: instruction.reports.map((report) => ({
        id: report.id,
        createdAt: report.createdAt,
      })),
    })),
  })),
});
