export type Report = {
  id: string;
  steps: Array<StepDiff & StepBase>;
};

type StepDiff =
  | {
      type: "find";
      selector: string;
    }
  | {
      type: "click";
    }
  | {
      type: "type";
      text: string;
    };

type StepBase = {
  screenshot: string;
  logs: string[];
};
