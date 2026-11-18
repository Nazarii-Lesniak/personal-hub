"use server";

import { revalidatePath } from "next/cache";

import { deleteEvent, eventIdSchema } from "@/entities/event";
import type { DeleteEventState } from "../model/delete-event.types";

export async function deleteEventAction(
  _prevState: DeleteEventState,
  formData: FormData,
): Promise<DeleteEventState> {
  const id = formData.get("id");

  const result = eventIdSchema.safeParse(id);

  if (!result.success) {
    return { error: "Invalid event id", success: false };
  }

  const deletedEvent = await deleteEvent(result.data);

  if (!deletedEvent) {
    return { error: "Event not found", success: false };
  }

  revalidatePath("/calendar");

  return { error: null, success: true };
}
