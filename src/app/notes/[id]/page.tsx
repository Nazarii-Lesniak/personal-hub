import { ArrowLeft, Pencil } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getNoteById, noteIdSchema } from "@/entities/note";
import { DeleteNoteForm } from "@/features/delete-note";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { PageTransition } from "@/shared/ui/page-transition";

interface NotePageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Note",
};

export default async function Note({ params }: NotePageProps) {
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
      <div className="mx-auto flex w-full flex-col gap-4 md:gap-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Button
            variant="ghost"
            nativeButton={false}
            render={<Link href="/notes" />}
          >
            <ArrowLeft />
            Back
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href={`/notes/${note.id}/edit`} />}
            >
              <Pencil />
              Edit
            </Button>
            <DeleteNoteForm id={note.id} />
          </div>
        </div>

        <Card>
          <CardContent>
            <p className="wrap-break-words whitespace-pre-wrap md:text-base">
              {note.content}
            </p>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}
