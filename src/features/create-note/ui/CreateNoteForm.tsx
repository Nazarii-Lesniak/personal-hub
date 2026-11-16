"use client";

import { useActionState } from "react";

import { Button } from "@/shared/ui/button";
import { Textarea } from "@/shared/ui/textarea";

import { createNoteAction } from "../api/create-note.action";
import type { CreateNoteState } from "../model/create-note.types";

const initialState: CreateNoteState = {
  error: null,
  content: "",
};

export function CreateNoteForm() {
  const [state, formAction, isPending] = useActionState(
    createNoteAction,
    initialState,
  );

  return (
    <form action={formAction} className="flex w-full flex-col gap-4">
      <Textarea
        name="content"
        required
        maxLength={10_000}
        defaultValue={state.content}
        placeholder="Write your note..."
        aria-label="Note content"
        aria-invalid={state.error !== null}
        aria-describedby={state.error ? "content-error" : undefined}
        className="min-h-40 sm:min-h-52 md:min-h-64"
      />

      {state.error && (
        <p id="content-error" role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="w-full sm:w-auto sm:self-end"
      >
        {isPending ? "Creating..." : "Create note"}
      </Button>
    </form>
  );
}
