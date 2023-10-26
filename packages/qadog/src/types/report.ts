export type Report = {
  steps: Step[];
};

type Step =
  | {
      type: "find";
      body: string;
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
