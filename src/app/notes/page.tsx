import Link from "next/link";
import { NoteCard } from "@/entities/note/ui/NoteCard";
import { MOCK_NOTES } from "@/mocks/mockCardContent";

export default function NotesListPage() {
  return (
    <main className="flex flex-col gap-10">
      <div className="flex justify-center">
        <Link href="/" className="underline">
          Go home
        </Link>
      </div>
      <div className="grid w-full justify-items-center grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4 xl:gap-6">
        {MOCK_NOTES.map((note) => (
          <Link
            key={note.id}
            href={`notes/${note.id}`}
            className="w-full max-w-80"
          >
            <NoteCard>
              <span>{note.content}</span>
            </NoteCard>
          </Link>
        ))}
      </div>
    </main>
  );
}
