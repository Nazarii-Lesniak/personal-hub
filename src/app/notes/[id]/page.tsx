import type { Metadata } from "next";
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
    <main className="flex flex-1 items-center justify-center">
      <NoteCard showBack>
        <span>{note.content}</span>
      </NoteCard>
    </main>
  );
}
