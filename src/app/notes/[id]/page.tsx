import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getNoteById, NoteCard, noteIdSchema } from "@/entities/note";
import { DeleteNoteForm } from "@/features/delete-note";

interface NotePageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Note",
};

export default async function Note({ params }: NotePageProps) {
  const { id } = await params;

  if (!noteIdSchema.safeParse(id).success) {
    notFound();
  }

  const note = await getNoteById(id);

  if (!note) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4">
      <div className="flex items-center gap-3">
        <Link
          href={`/notes/${note.id}/edit`}
          className="rounded-xl bg-cyan-900 px-4 py-2 text-white"
        >
          Edit note
        </Link>

        <DeleteNoteForm id={note.id} />
      </div>

      <NoteCard showBack>
        <span>{note.content}</span>
      </NoteCard>
    </main>
  );
}
