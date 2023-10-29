export type Report = {
  id: string;
  steps: Step[];
};

type Step =
  | {
      type: "find";
      selector: string;
      screenshot: string;
    }
  | {
      type: "click";
      screenshot: string;
    }
  | {
      type: "type";
      text: string;
      screenshot: string;
    };
