"use client";

import { Trash2 } from "lucide-react";
import { useActionState, useEffect, useState } from "react";

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

import { deleteEventAction } from "../api/delete-event.action";
import type { DeleteEventState } from "../model/delete-event.types";

interface DeleteEventFormProps {
  id: string;
}

const initialState: DeleteEventState = {
  error: null,
  success: false,
};

export function DeleteEventForm({ id }: DeleteEventFormProps) {
  const [state, formAction, isPending] = useActionState(
    deleteEventAction,
    initialState,
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (state.success) {
      setOpen(false);
    }
  }, [state.success]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Delete event"
            className="text-destructive hover:text-destructive"
          />
        }
      >
        <Trash2 />
      </AlertDialogTrigger>

      <AlertDialogContent>
        <form action={formAction} className="contents">
          <input type="hidden" name="id" value={id} />

          <AlertDialogHeader>
            <AlertDialogTitle>Delete this event?</AlertDialogTitle>
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
