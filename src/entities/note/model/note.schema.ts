import { z } from "zod";

export const noteSchema = z.object({
  content: z
    .string()
    .transform((value) => value.replace(/\r\n/g, "\n").trim())
    .pipe(
      z
        .string()
        .min(1, { message: "Note cannot be empty" })
        .max(10_000, { message: "Note cannot exceed 10,000 characters" }),
    ),
});

export const noteIdSchema = z.uuid({ error: "Invalid note id" });
