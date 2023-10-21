import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const gpt = async (
  prompt: string,
  temperature: number = 0.9
): Promise<string> => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
    temperature,
  });
  return completion.choices[0].message.content ?? "";
};
