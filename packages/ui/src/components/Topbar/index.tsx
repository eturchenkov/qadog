import type { FC } from "react";

export const Topbar: FC = () => {
  return (
    <div className="w-full bg-base-200 flex">
      <div className="flex-1">
        <div className="px-8 py-4 flex space-x-4">
          <p className="flex-none cursor-pointer">
            <span className="text-base">qadog</span>
          </p>
        </div>
      </div>
    </div>
  );
};
