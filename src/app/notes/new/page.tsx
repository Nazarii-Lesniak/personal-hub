import type { Metadata } from "next";
import Link from "next/link";

import { CreateNoteForm } from "@/features/create-note";

export const metadata: Metadata = {
  title: "Create note",
};

export default function CreateNotePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4">
      <h1 className="text-xl font-semibold">Create a note</h1>

      <div className="w-full max-w-80">
        <CreateNoteForm />
      </div>

      <Link href="/notes" className="text-sm underline">
        Back to notes
      </Link>
    </main>
  );
}
