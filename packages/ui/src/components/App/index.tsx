import { useEffect } from "react";
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

  const { epic } = store;

  return (
    <div className="w-screen h-screen relative">
      <Topbar />
      <div className="w-full h-[calc(100vh-3.5rem)] flex">
        <div className="flex-1 grow-[2]">
          <div className="h-full text-left overflow-y-auto border-0 border-r-2 border-e-gray-900">
            {epic !== null && (
              <div className="p-4">
                <p className="p-2">{epic.userGoal}</p>
                {epic.stories.map((story, si) => (
                  <div key={si} className="p-2">
                    <p>{story.text}</p>
                    {story.instructions.map((instruction, ii) => (
                      <p key={ii} className="p-4">
                        {instruction.steps.map((step, i) => (
                          <span key={i}>
                            {step}
                            <br />
                          </span>
                        ))}
                        <button className="mt-3 btn btn-sm btn-outline btn-success normal-case">
                          Generate report
                        </button>
                      </p>
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
        <div className="flex-1 grow-[3]">
          <div className="h-full text-left overflow-y-auto">
            <div className="p-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
