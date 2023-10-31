declare global {
  namespace State {
    export type Report = {
      id: string;
      steps: Array<StepDiff & StepBase & { folded: boolean }>;
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
      logs: Array<{ text: string; folded: boolean }>;
    };

    type Epic = {
      url: string;
      userGoal: string;
      stories: Story[];
    };

    type Story = {
      text: string;
      instructions: Instruction[];
    };

    type Instruction = {
      steps: string[];
      reports: Array<{
        id: string;
        createdAt: number;
        selected: boolean;
      }>;
    };
  }
}

export {};
