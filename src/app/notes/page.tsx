import type { Metadata } from "next";
import Link from "next/link";
import { getNotes, NoteCard } from "@/entities/note/";

export const metadata: Metadata = {
  title: "Notes",
};

export default async function NotesListPage() {
  const notes = await getNotes();

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-10">
      {notes.length > 0 ? (
        <div className="grid w-full justify-items-center grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4 xl:gap-6">
          {notes.map((note) => (
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
      ) : (
        <p>No notes yet.</p>
      )}
    </main>
  );
}
