"use server";

import { revalidatePath } from "next/cache";
import { RedirectType, redirect } from "next/navigation";

import { deleteNote, noteIdSchema } from "@/entities/note";
import type { DeleteNoteState } from "../model/delete-note.types";

export async function deleteNoteAction(
  _prevState: DeleteNoteState,
  formData: FormData,
): Promise<DeleteNoteState> {
  const id = formData.get("id");

  const result = noteIdSchema.safeParse(id);

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

  redirect("/notes", RedirectType.replace);
}
