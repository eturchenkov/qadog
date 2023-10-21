declare global {
  namespace NodeJS {
    interface Process {
      env: {
        OPENAI_API_KEY: string;
      };
      argv: [string, string, "instruct" | "inspect" | undefined];
    }
  }
}

export {};
