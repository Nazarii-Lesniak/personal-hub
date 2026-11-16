import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { z } from "zod";

import { getNoteById, noteIdSchema } from "@/entities/note";
import { EditNoteForm } from "@/features/edit-note";

interface EditNotePageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Edit note",
};

export default async function EditNotePage({ params }: EditNotePageProps) {
  const { id } = await params;

  if (!noteIdSchema.safeParse(id).success) {
    notFound();
  }

  if (!z.uuid().safeParse(id).success) {
    notFound();
  }

  const note = await getNoteById(id);

  if (!note) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-xl font-semibold">Edit note</h1>

      <div className="w-full max-w-80">
        <EditNoteForm id={note.id} content={note.content} />
      </div>

      <Link href={`/notes/${note.id}`} className="text-sm underline">
        Cancel
      </Link>
    </main>
  );
}
