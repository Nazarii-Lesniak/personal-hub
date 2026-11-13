"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { deleteNote } from "@/entities/note";
import type { DeleteNoteState } from "@/features/delete-note";

export async function deleteNoteAction(
  _prevState: DeleteNoteState,
  formData: FormData,
): Promise<DeleteNoteState> {
  const id = formData.get("id");

  const result = z.uuid().safeParse(id);

  if (!result.success) {
    return {
      error: "Invalid note id",
    };
  }

  const deletedNote = await deleteNote(result.data);

  if (!deletedNote) {
    return { error: "Note not found" };
  }

  revalidatePath("/notes");

  redirect("/notes");
}
