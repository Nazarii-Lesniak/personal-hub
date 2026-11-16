"use client";

import { Trash2 } from "lucide-react";
import { useActionState } from "react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/ui/alert-dialog";
import { Button } from "@/shared/ui/button";

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

  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive" />}>
        <Trash2 />
        Delete
      </AlertDialogTrigger>

      <AlertDialogContent>
        <form action={formAction} className="contents">
          <input type="hidden" name="id" value={id} />

          <AlertDialogHeader>
            <AlertDialogTitle>Delete this note?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {state.error && (
            <p role="alert" className="text-sm text-destructive">
              {state.error}
            </p>
          )}

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <Button type="submit" variant="destructive" disabled={isPending}>
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
