"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { noteIdSchema, noteSchema, updateNote } from "@/entities/note";
import type { EditNoteState } from "@/features/edit-note";

export async function editNoteAction(
  _prevState: EditNoteState,
  formData: FormData,
): Promise<EditNoteState> {
  const id = formData.get("id");
  const content = formData.get("content");

  const idResult = noteIdSchema.safeParse(id);

  const contentResult = noteSchema.safeParse({
    content: typeof content === "string" ? content : "",
  });

  if (!idResult.success) {
    return {
      error: idResult.error.issues[0]?.message ?? "Invalid id",
    };
  }

  if (!contentResult.success) {
    return {
      error: contentResult.error.issues[0]?.message ?? "Invalid note content",
    };
  }

  const note = await updateNote(idResult.data, contentResult.data.content);

  if (!note) {
    return { error: "Note not found" };
  }

  revalidatePath("/notes");
  revalidatePath(`/notes/${note.id}`);

  redirect(`/notes/${note.id}`);
}
