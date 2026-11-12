import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { NoteCard } from "@/entities/note";
import { MOCK_NOTES } from "@/mocks/mockCardContent";

interface NotePageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Note",
};

export default async function Note({ params }: NotePageProps) {
  const { id } = await params;

  const note = MOCK_NOTES.find((note) => note.id === id);

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
