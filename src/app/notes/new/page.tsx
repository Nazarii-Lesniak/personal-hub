import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { CreateNoteForm } from "@/features/create-note";
import { Button } from "@/shared/ui/button";
import { PageTransition } from "@/shared/ui/page-transition";

export const metadata: Metadata = {
  title: "Create note",
};

export default function CreateNotePage() {
  return (
    <PageTransition>
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 md:gap-6">
        <Button
          variant="ghost"
          nativeButton={false}
          render={<Link href="/notes" />}
          className="self-start"
        >
          <ArrowLeft />
          Back to notes
        </Button>

        <h1 className="text-xl font-semibold">Create a note</h1>

        <CreateNoteForm />
      </div>
    </PageTransition>
  );
}
