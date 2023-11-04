import { useState, useEffect } from "react";
import { useStore } from "@/store";
import { Story } from "@/components/Story";
import type { FC } from "react";

export const EpicPanel: FC = () => {
  const {
    store: { epic },
  } = useStore();
  const [url, setUrl] = useState<string>("");
  const [goal, setGoal] = useState<string>("");

  useEffect(() => {
    setUrl(epic.url);
    setGoal(epic.userGoal);
  }, [epic.url, epic.userGoal]);

  return (
    <div className="p-4">
      <p className="p-2">
        <span className="px-2 py-1 mr-2 text-gray-200 bg-gray-700 rounded-lg">
          url
        </span>
        <input
          type="text"
          className="text-slate-400 bg-transparent focus:outline-none"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </p>
      <p className="p-2 text-slate-400">
        <span className="px-2 py-1 mr-2 text-gray-200 bg-gray-700 rounded-lg">
          goal
        </span>
        <input
          type="text"
          className="text-slate-400 bg-transparent focus:outline-none"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
      </p>
      {epic.stories.map((_, si) => (
        <Story key={si} si={si} />
      ))}
    </div>
  );
};
