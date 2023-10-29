import { useEffect } from "react";
import cs from "classnames";
import { format } from "date-fns/esm/fp";
import { service } from "@/service";
import { useStore } from "@/store";
import { Topbar } from "@/components/Topbar";
import * as M from "@/store/mutations";

let isMounted = false; // check if it needs for prod

export const App = () => {
  const { store, mutateStore } = useStore();

  useEffect(() => {
    if (!isMounted) {
      isMounted = true;
      service.getEpic().then((epic) => {
        mutateStore(M.updateEpic(epic));
      });
    }
  }, []);

  const { epic, report } = store;

  return (
    <div className="w-screen h-screen relative">
      <Topbar />
      <div className="w-full h-[calc(100vh-3.5rem)] flex">
        <div className="flex-1 grow-[1]">
          <div className="h-full text-left overflow-y-auto border-0 border-r-2 border-e-gray-900">
            {epic !== null && (
              <div className="p-4">
                <p className="p-2">
                  <span className="px-2 py-1 mr-2 text-gray-200 bg-gray-700 rounded-lg">
                    url
                  </span>
                  <span className="text-slate-400">{epic.url}</span>
                </p>
                <p className="p-2 text-slate-400">
                  <span className="px-2 py-1 mr-2 text-gray-200 bg-gray-700 rounded-lg">
                    goal
                  </span>
                  <span>{epic.userGoal}</span>
                </p>
                {epic.stories.map((story, si) => (
                  <div key={si} className="p-2">
                    <p className="mb-4 p-3 text-slate-300 border border-slate-500 rounded-lg">
                      {story.text}
                    </p>
                    {story.instructions.map((instruction, ii) => (
                      <div key={ii} className="mt-4 pl-8">
                        <p className="mb-4 p-2 pl-4 text-slate-400 border-l-2 border-purple-500">
                          {instruction.steps.map((step, i) => (
                            <span key={i}>
                              {step}
                              <br />
                            </span>
                          ))}
                        </p>
                        {instruction.reports.map((report, ri) => (
                          <p key={ri} className="mb-4">
                            {!report.selected ? (
                              <span
                                className="ml-6 px-3 py-1 font-medium text-gray-300 bg-gray-700 rounded-lg cursor-pointer"
                                onClick={() =>
                                  service
                                    .getReport(report.id)
                                    .then((report) =>
                                      mutateStore(
                                        M.updateReport(report, si, ii, ri)
                                      )
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
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 grow-[2]">
          <div className="h-full text-left overflow-y-auto">
            <div className="p-4 m-auto max-w-3xl">
              {report.steps.map((step, si) => (
                <div
                  key={si}
                  className="mb-4 border border-slate-500 rounded-lg"
                >
                  <p
                    className="p-2 cursor-pointer"
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
                    {step.type === "find" && <span>{step.selector}</span>}
                    {step.type === "type" && <span>{step.text}</span>}
                  </p>
                  {!step.folded && (
                    <div>
                      <img
                        className="w-4/5 m-auto p-4"
                        src={`http://localhost:5000/reports/${report.id}/${step.screenshot}`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const dateFormat = format("HH:mm:ss MMM d");
const reportName = (date: number) => `Report - ${dateFormat(date)}`;

export default App;
