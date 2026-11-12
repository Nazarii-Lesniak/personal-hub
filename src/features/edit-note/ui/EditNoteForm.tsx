"use client";

import { useActionState } from "react";

import { type EditNoteState, editNoteAction } from "@/features/edit-note";

interface EdidNoteFormProps {
  id: string;
  content: string;
}

const initialState: EditNoteState = {
  error: null,
};

export function EditNoteForm({ id, content }: EdidNoteFormProps) {
  const [state, formAction, isPending] = useActionState(
    editNoteAction,
    initialState,
  );

  return (
    <form action={formAction} className="flex w-full flex-col gap-4">
      <input type="hidden" name="id" value={id} />

      <textarea
        name="content"
        defaultValue={content}
        required
        maxLength={10_000}
        aria-describedby={state.error ? "content-error" : undefined}
        placeholder="Write your note..."
        className="min-h-40 w-full resize-y rounded-xl border p-3"
      />

      {state.error && (
        <p id="content-error" role="alert" className="text-sm text-red-400">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="cursor-pointer rounded-xl bg-cyan-900 px-4 py-2 text-white disabled:opacity-50"
      >
        {isPending ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}
