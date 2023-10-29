declare global {
  namespace State {
    type Report = {
      id: string;
      steps: Array<Step & { folded: boolean }>;
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
