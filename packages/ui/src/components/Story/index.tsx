import { useState, useEffect } from "react";
import { format } from "date-fns/esm/fp";
import { service } from "@/service";
import { useStore } from "@/store";
import * as M from "@/store/mutations";
import { TrashIcon } from "@heroicons/react/24/outline";
import type { FC } from "react";

export const Story: FC<{ si: number }> = ({ si }) => {
  const { store, mutateStore } = useStore();
  const epic = store.epic;
  const story = epic.stories[si];
  const [text, setText] = useState<string>("");

  useEffect(() => {
    setText(story.text);
  }, [story.text]);

  return (
    <div className="p-2">
      <textarea
        className="p-3 w-full h-28 text-slate-300 border border-slate-500 rounded-lg bg-transparent focus:outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => {
          if (text !== story.text) {
            const nextEpic = {
              ...epic,
              stories: epic.stories.map((story, i) =>
                i === si ? { ...story, text } : story
              ),
            };
            mutateStore(M.updateEpic(nextEpic));
            service.updateEpic(nextEpic);
          }
        }}
      />
      {story.instructions.map((instruction, ii) => (
        <div key={ii} className="mt-3 pl-8">
          <div className="mb-4 group/i text-slate-400">
            <p className="px-4 py-2 inline-block relative border-l-2 border-purple-500">
              {instruction.steps.map((step, i) => (
                <span key={i}>
                  {step}
                  <br />
                </span>
              ))}
              <TrashIcon
                className="h-5 w-5 absolute top-1/2 right-[-20px] hidden group-hover/i:block cursor-pointer"
                onClick={() => {
                  const nextEpic = removeInstruction(epic, si, ii);
                  mutateStore(
                    M.updateEpic(
                      nextEpic,
                      story.instructions.some((i) =>
                        i.reports.some((r) => r.selected)
                      )
                    )
                  );
                  service.updateEpic(nextEpic);
                }}
              />
            </p>
          </div>
          {instruction.reports.map((report, ri) => (
            <p key={ri} className="mb-4 group/r">
              {!report.selected ? (
                <span
                  className="ml-6 px-3 py-1 font-medium text-gray-300 bg-gray-700 rounded-lg cursor-pointer"
                  onClick={() =>
                    service
                      .getReport(report.id)
                      .then((report) =>
                        mutateStore(M.setReport(report, si, ii, ri))
                      )
                  }
                >
                  {reportName(report.createdAt)}
                </span>
              ) : (
                <span className="ml-6 px-3 py-1 font-medium text-gray-800 bg-teal-600 rounded-lg">
                  {reportName(report.createdAt)}
                </span>
              )}
              <TrashIcon
                className="ml-4 h-5 w-5 hidden align-top text-slate-400 group-hover/r:inline-block cursor-pointer"
                onClick={() => {
                  const nextEpic = removeReport(epic, si, ii, ri);
                  mutateStore(
                    M.updateEpic(
                      nextEpic,
                      instruction.reports.some((r) => r.selected)
                    )
                  );
                  service.updateEpic(nextEpic);
                }}
              />
            </p>
          ))}
          <button
            className="ml-6 btn btn-sm btn-outline btn-success normal-case"
            onClick={() =>
              service
                .addReport(si, ii)
                .then((epic) => mutateStore(M.setEpic(epic)))
            }
          >
            Generate report
          </button>
        </div>
      ))}
      <button
        className="ml-8 mt-4 btn btn-sm btn-outline btn-primary normal-case"
        onClick={() =>
          service
            .addInstruction(si)
            .then((epic) => mutateStore(M.setEpic(epic)))
        }
      >
        Generate instructions
      </button>
    </div>
  );
};

const dateFormat = format("HH:mm:ss MMM d");
const reportName = (date: number) => `Report - ${dateFormat(date)}`;

const removeInstruction = (
  epic: State.Epic,
  si: number,
  ii: number
): State.Epic => ({
  ...epic,
  stories: epic.stories.map((story, i) =>
    i === si
      ? {
          ...story,
          instructions: story.instructions.filter((_, i_i) => i_i !== ii),
        }
      : story
  ),
});

const removeReport = (
  epic: State.Epic,
  si: number,
  ii: number,
  ri: number
): State.Epic => ({
  ...epic,
  stories: epic.stories.map((story, s_i) =>
    s_i === si
      ? {
          ...story,
          instructions: story.instructions.map((instruction, i_i) =>
            i_i === ii
              ? {
                  ...instruction,
                  reports: instruction.reports.filter((_, r_i) => r_i !== ri),
                }
              : instruction
          ),
        }
      : story
  ),
});
