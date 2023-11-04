import { useEffect } from "react";
import { service } from "@/service";
import { useStore } from "@/store";
import * as M from "@/store/mutations";
import { Topbar } from "@/components/Topbar";
import { EpicPanel } from "@/components/EpicPanel";
import { Report } from "@/components/Report";
import type { FC } from "react";

let isMounted = false; // check if it needs for prod

export const App: FC = () => {
  const { mutateStore } = useStore();

  useEffect(() => {
    if (!isMounted) {
      isMounted = true;
      service.getEpic().then((epic) => {
        mutateStore(M.updateEpic(epic));
      });
    }
  }, []);

  return (
    <div className="w-screen h-screen relative">
      <Topbar />
      <div className="w-full h-[calc(100vh-3.5rem)] flex">
        <div className="flex-1 grow-[1]">
          <div className="h-full text-left overflow-y-auto border-0 border-r-2 border-e-gray-900">
            <EpicPanel />
          </div>
        </div>
        <div className="flex-1 grow-[2]">
          <div className="h-full text-left overflow-y-auto">
            <Report />
          </div>
        </div>
      </div>
    </div>
  );
};
