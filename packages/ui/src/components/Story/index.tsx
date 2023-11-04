import { useState, useEffect } from "react";
import { format } from "date-fns/esm/fp";
import { service } from "@/service";
import { useStore } from "@/store";
import * as M from "@/store/mutations";
import { TrashIcon } from "@heroicons/react/24/outline";
import type { FC } from "react";

export const Story: FC<{ si: number }> = ({ si }) => {
  const { store, mutateStore } = useStore();
  const story = store.epic.stories[si];
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
              <TrashIcon className="h-5 w-5 absolute top-1/2 right-[-20px] hidden group-hover/i:block cursor-pointer" />
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
                        mutateStore(M.updateReport(report, si, ii, ri))
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
              <TrashIcon className="ml-4 h-5 w-5 hidden align-top text-slate-400 group-hover/r:inline-block cursor-pointer" />
            </p>
          ))}
          <button
            className="ml-6 btn btn-sm btn-outline btn-success normal-case"
            onClick={() =>
              service
                .addReport(si, ii)
                .then((epic) => mutateStore(M.updateEpic(epic)))
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
            .then((epic) => mutateStore(M.updateEpic(epic)))
        }
      >
        Generate instructions
      </button>
    </div>
  );
};

const dateFormat = format("HH:mm:ss MMM d");
const reportName = (date: number) => `Report - ${dateFormat(date)}`;
