import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getNoteById, NoteCard } from "@/entities/note";

interface NotePageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Note",
};

export default async function Note({ params }: NotePageProps) {
  const { id } = await params;

  const note = await getNoteById(id);

  if (!note) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4">
      <Link
        href={`/notes/${note.id}/edit`}
        className="rounded-xl bg-cyan-900 px-4 py-2 text-white"
      >
        Edit note
      </Link>

      <NoteCard showBack>
        <span>{note.content}</span>
      </NoteCard>
    </main>
  );
}
