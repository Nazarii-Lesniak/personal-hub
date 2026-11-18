"use server";

import { revalidatePath } from "next/cache";

import { eventIdSchema, eventSchema, updateEvent } from "@/entities/event";
import type { EditEventState } from "../model/edit-event.types";

export async function editEventAction(
  _prevState: EditEventState,
  formData: FormData,
): Promise<EditEventState> {
  const id = formData.get("id");
  const rawTitle = formData.get("title");
  const rawStartsAt = formData.get("startsAt");

  const idResult = eventIdSchema.safeParse(id);

  if (!idResult.success) {
    return {
      error: idResult.error.issues[0]?.message ?? "Invalid event id",
      success: false,
    };
  }

  const eventResult = eventSchema.safeParse({
    title: typeof rawTitle === "string" ? rawTitle : "",
    startsAt: typeof rawStartsAt === "string" ? rawStartsAt : "",
  });

  if (!eventResult.success) {
    return {
      error: eventResult.error.issues[0]?.message ?? "Invalid event",
      success: false,
    };
  }

  const event = await updateEvent(
    idResult.data,
    eventResult.data.title,
    eventResult.data.startsAt,
  );

  if (!event) {
    return { error: "Event not found", success: false };
  }

  revalidatePath("/calendar");

  return { error: null, success: true };
}
