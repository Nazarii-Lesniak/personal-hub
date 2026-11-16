"use client";

import { type SubmitEvent, useActionState } from "react";

import { deleteNoteAction } from "../api/delete-note.action";
import type { DeleteNoteState } from "../model/delete-note.types";

interface DeleteNoteFormProps {
  id: string;
}

const initialState: DeleteNoteState = {
  error: null,
};

export function DeleteNoteForm({ id }: DeleteNoteFormProps) {
  const [state, formAction, isPending] = useActionState(
    deleteNoteAction,
    initialState,
  );

  const handleSubmit = (event: SubmitEvent) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?",
    );

    if (!confirmed) {
      event.preventDefault();
    }
  };

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-2"
    >
      <input type="hidden" name="id" value={id} />

      <button
        type="submit"
        disabled={isPending}
        aria-describedby={state.error ? "delete-note-error" : undefined}
        className="cursor-pointer rounded-xl bg-red-700 px-4 py-2 text-white disabled:opacity-50"
      >
        {isPending ? "Deleting..." : "Delete note"}
      </button>

      {state.error && (
        <p id="delete-note-error" role="alert" className="text-sm text-red-400">
          {state.error}
        </p>
      )}
    </form>
  );
}
