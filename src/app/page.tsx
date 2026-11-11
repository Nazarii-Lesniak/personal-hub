import { NoteCard } from "@/entities/note/ui/NoteCard";
import { MOCK_NOTES } from "@/mocks/mockCardContent";

export default function HomePage() {
  return (
    <main className="w-full">
      <div className="grid w-full justify-items-center grid-cols-1 gap-2 p-2 sm:grid-cols-2 md:gap-3 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4 xl:gap-6">
        {MOCK_NOTES.map((note) => (
          <NoteCard key={note.id}>
            <span>{note.content}</span>
          </NoteCard>
        ))}
      </div>
    </main>
  );
}
