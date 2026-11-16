"use client";

import { useActionState } from "react";

import { createNoteAction } from "../api/create-note.action";
import type { CreateNoteState } from "../model/create-note.types";

const initialState: CreateNoteState = {
  error: null,
};

export function CreateNoteForm() {
  const [state, formAction, isPending] = useActionState(
    createNoteAction,
    initialState,
  );

  return (
    <form action={formAction} className="flex w-full flex-col gap-4">
      <textarea
        name="content"
        required
        maxLength={10_000}
        placeholder="Write your note..."
        className="min-h-40 w-full resize-y rounded-xl border p-3"
      />

      {state.error && (
        <p role="alert" className="text-sm text-red-400">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="cursor-pointer rounded-xl bg-cyan-900 px-4 py-2 text-white disabled:opacity-50"
      >
        {isPending ? "Creating..." : "Create note"}
      </button>
    </form>
  );
}
