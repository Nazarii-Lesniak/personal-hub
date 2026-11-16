"use server";

import { revalidatePath } from "next/cache";
import { RedirectType, redirect } from "next/navigation";

import { noteIdSchema, noteSchema, updateNote } from "@/entities/note";
import type { EditNoteState } from "../model/edit-note.types";

export async function editNoteAction(
  _prevState: EditNoteState,
  formData: FormData,
): Promise<EditNoteState> {
  const id = formData.get("id");
  const rawContent = formData.get("content");
  const content = typeof rawContent === "string" ? rawContent : "";

  const idResult = noteIdSchema.safeParse(id);

  if (!idResult.success) {
    return {
      error: idResult.error.issues[0]?.message ?? "Invalid note id",
      content,
    };
  }

  const contentResult = noteSchema.safeParse({ content });

  if (!contentResult.success) {
    return {
      error: contentResult.error.issues[0]?.message ?? "Invalid note content",
      content,
    };
  }

  const note = await updateNote(idResult.data, contentResult.data.content);

  if (!note) {
    return { error: "Note not found", content };
  }

  revalidatePath("/notes");
  revalidatePath(`/notes/${note.id}`);

  redirect(`/notes/${note.id}`, RedirectType.replace);
}
