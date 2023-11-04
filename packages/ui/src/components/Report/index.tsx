import cs from "classnames";
import { useStore } from "@/store";
import * as M from "@/store/mutations";
import type { FC } from "react";

export const Report: FC = () => {
  const {
    store: { report },
    mutateStore,
  } = useStore();
  return (
    <div className="p-4 m-auto max-w-3xl">
      {report.steps.map((step, si) => (
        <div key={si} className="mb-4 border border-slate-500 rounded-lg">
          <p
            className="p-2 relative cursor-pointer"
            onClick={() => mutateStore(M.toggleReportStep(si))}
          >
            <span
              className={cs(
                "mr-2 py-0.5 px-2 text-sm font-normal text-gray-300 rounded-lg",
                {
                  "bg-pink-900": step.type === "find",
                  "bg-fuchsia-900": step.type === "click",
                  "bg-indigo-900": step.type === "type",
                }
              )}
            >
              {step.type}
            </span>
            {step.logs.length > 0 && (
              <span className="py-0.5 px-2 absolute right-2 text-sm font-normal text-gray-300 bg-sky-900 rounded-lg">
                {step.logs.length} log{step.logs.length > 1 && "s"}
              </span>
            )}
            {step.type === "find" && <span>{step.selector}</span>}
            {step.type === "type" && <span>{step.text}</span>}
          </p>
          {!step.folded && (
            <div>
              <img
                className="w-4/5 m-auto p-4"
                src={`http://localhost:5000/reports/${report.id}/${step.screenshot}`}
              />
              {step.logs.length > 0 && (
                <div className="px-12 pb-4">
                  {step.logs.map((log, li) => (
                    <span
                      key={li}
                      className={cs("text-sm text-slate-400 cursor-pointer", {
                        "line-clamp-1 hover:text-slate-300": log.folded,
                      })}
                      onClick={() => mutateStore(M.toggleStepLog(si, li))}
                    >
                      {log.text}
                      <br />
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
