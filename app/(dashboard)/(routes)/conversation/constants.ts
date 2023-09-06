import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required.",
  }),
});

export interface Message {
  role: string;
  content?: string;
}
