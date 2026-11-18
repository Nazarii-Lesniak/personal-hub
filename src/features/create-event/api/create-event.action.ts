"use server";

import { revalidatePath } from "next/cache";

import { createEvent, eventSchema } from "@/entities/event";

import type { CreateEventState } from "../model/create-event.types";

export async function createEventAction(
  _prevState: CreateEventState,
  formData: FormData,
): Promise<CreateEventState> {
  const rawTitle = formData.get("title");
  const rawStartsAt = formData.get("startsAt");

  const result = eventSchema.safeParse({
    title: typeof rawTitle === "string" ? rawTitle : "",
    startsAt: typeof rawStartsAt === "string" ? rawStartsAt : "",
  });

  if (!result.success) {
    return {
      error: result.error.issues[0]?.message ?? "Invalid event",
      success: false,
    };
  }

  await createEvent(result.data.title, result.data.startsAt);

  revalidatePath("/calendar");

  return { error: null, success: true };
}
