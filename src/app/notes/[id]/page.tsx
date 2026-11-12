import { notFound } from "next/navigation";
import { NoteCard } from "@/entities/note/ui/NoteCard";
import { MOCK_NOTES } from "@/mocks/mockCardContent";

interface NotePageProps {
  params: Promise<{ id: string }>;
}

export default async function Note({ params }: NotePageProps) {
  const { id } = await params;

  const note = MOCK_NOTES.find((note) => note.id === id);

  if (!note) {
    notFound();
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-2">
      <NoteCard showBack>
        <span>{note.content}</span>
      </NoteCard>
    </main>
  );
}
