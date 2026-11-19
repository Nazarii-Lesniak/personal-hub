import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { getNotes, NoteCard } from "@/entities/note";
import { UrlSearchBar } from "@/features/filter-items";
import { Button } from "@/shared/ui/button";
import { PageTransition } from "@/shared/ui/page-transition";

export const metadata: Metadata = {
  title: "Notes",
};

interface NotesPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function NotesListPage({ searchParams }: NotesPageProps) {
  const { q: query } = await searchParams;
  const notes = await getNotes(query);

  return (
    <PageTransition>
      <div className="flex flex-col gap-6 md:gap-8">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Notes
          </h1>
          <UrlSearchBar
            placeholder="Search notes..."
            ariaLabel="Search notes"
          />
          <Button
            nativeButton={false}
            render={<Link href="/notes/new" />}
            className="rounded-xl bg-cyan-900 px-4 py-2 text-white"
          >
            <Plus />
            Create note
          </Button>
        </div>

        {notes.length > 0 ? (
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6">
            {notes.map((note) => (
              <li key={note.id}>
                <Link
                  key={note.id}
                  href={`/notes/${note.id}`}
                  className="block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <NoteCard content={note.content}></NoteCard>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed p-8 text-center md:p-12">
            <p className="text-muted-foreground">
              {query?.trim() ? "No notes found." : "No notes yet."}
            </p>
            {!query?.trim() && (
              <Button
                variant="outline"
                nativeButton={false}
                render={<Link href="/notes/new" />}
              >
                Create your first note
              </Button>
            )}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
