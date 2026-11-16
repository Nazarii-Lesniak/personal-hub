"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createNote, noteSchema } from "@/entities/note";
import type { CreateNoteState } from "@/features/create-note";

export async function createNoteAction(
  _prevState: CreateNoteState,
  formData: FormData,
): Promise<CreateNoteState> {
  const content = formData.get("content");

  const result = noteSchema.safeParse({
    content: typeof content === "string" ? content : "",
  });

  if (!result.success) {
    return {
      error: result.error.issues[0]?.message ?? "Invalid note content",
    };
  }

  const note = await createNote(result.data.content);

  revalidatePath("/notes");

  redirect(`/notes/${note.id}`);
}
