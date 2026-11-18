import { z } from "zod";

export const eventSchema = z.object({
  title: z
    .string()
    .transform((value) => value.trim())
    .pipe(
      z
        .string()
        .min(1, { message: "Title cannot be empty" })
        .max(200, { message: "Title cannot exceed 200 characters" }),
    ),
  startsAt: z.iso
    .datetime({ error: "Invalid date or time" })
    .transform((value) => new Date(value)),
});

export const eventIdSchema = z.uuid({ error: "Invalid event id" });

export const eventMonthSchema = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, { message: "Invalid month" });
