export type Epic = {
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
  reports: Report[];
};

type Report = {
  id: string;
  createdAt: number;
};
