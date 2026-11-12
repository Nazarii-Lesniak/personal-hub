import { z } from "zod";

export const noteSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, { message: "Note cannot be empty" })
    .max(10_000, { message: "Note cannot exeed 10,000 characters" }),
});
