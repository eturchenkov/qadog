import { useEffect } from "react";
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
                <p className="p-2">Url: {epic.url}</p>
                <p className="p-2">Goal: {epic.userGoal}</p>
                {epic.stories.map((story, si) => (
                  <div key={si} className="p-2">
                    <p>{story.text}</p>
                    {story.instructions.map((instruction, ii) => (
                      <div key={ii} className="p-4 pl-8">
                        <p className="mb-2">
                          {instruction.steps.map((step, i) => (
                            <span key={i}>
                              {step}
                              <br />
                            </span>
                          ))}
                        </p>
                        {instruction.reports.map((report, ri) => (
                          <p
                            key={ri}
                            className="pl-2 cursor-pointer"
                            onClick={() =>
                              service
                                .getReport(report.id)
                                .then((report) =>
                                  mutateStore(M.updateReport(report))
                                )
                            }
                          >
                            {dateFormat(report.createdAt)}
                          </p>
                        ))}
                        <button
                          className="mt-3 btn btn-sm btn-outline btn-success normal-case"
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
                      className="btn btn-sm btn-outline normal-case"
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
            <div className="p-4 m-auto max-w-2xl">
              {report.steps.map((step, si) => (
                <div key={si}>
                  <p>{step.type}</p>
                  <img
                    src={`http://localhost:5000/${report.id}/${step.screenshot}`}
                  />
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

export default App;
