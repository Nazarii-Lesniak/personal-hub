"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createNote, noteSchema } from "@/entities/note";
import type { CreateNoteState } from "../model/create-note.types";

export async function createNoteAction(
  _prevState: CreateNoteState,
  formData: FormData,
): Promise<CreateNoteState> {
  const rawContent = formData.get("content");
  const content = typeof rawContent === "string" ? rawContent : "";

  const result = noteSchema.safeParse({ content });

  if (!result.success) {
    return {
      error: result.error.issues[0]?.message ?? "Invalid note content",
      content,
    };
  }

  const note = await createNote(result.data.content);

  revalidatePath("/notes");

  redirect(`/notes/${note.id}`);
}
