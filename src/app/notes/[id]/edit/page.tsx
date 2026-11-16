import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getNoteById, noteIdSchema } from "@/entities/note";
import { EditNoteForm } from "@/features/edit-note";
import { Button } from "@/shared/ui/button";
import { PageTransition } from "@/shared/ui/page-transition";

interface EditNotePageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Edit note",
};

export default async function EditNotePage({ params }: EditNotePageProps) {
  const { id } = await params;

  if (!noteIdSchema.safeParse(id).success) {
    notFound();
  }

  const note = await getNoteById(id);

  if (!note) {
    notFound();
  }

  return (
    <PageTransition>
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 md:gap-6">
        <Button
          variant="ghost"
          nativeButton={false}
          render={<Link href={`/notes/${note.id}`} />}
          className="self-start"
        >
          <ArrowLeft />
          Cancel
        </Button>

        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Edit note
        </h1>

        <EditNoteForm id={note.id} content={note.content} />
      </div>
    </PageTransition>
  );
}
