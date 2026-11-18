"use client";

import { useActionState, useEffect, useId, useState } from "react";

import type { CalendarEvent } from "@/entities/event";
import {
  localDateTimeToISOString,
  toDateInputValue,
  toTimeInputValue,
} from "@/shared/lib/date/local-datetime";
import { Button } from "@/shared/ui/button";
import { DialogFooter } from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

import { editEventAction } from "../api/edit-event.action";

interface EditEventFormProps {
  event: CalendarEvent;
  onSuccess: () => void;
}

export function EditEventForm({ event, onSuccess }: EditEventFormProps) {
  const [state, formAction, isPending] = useActionState(editEventAction, {
    error: null,
    success: false,
  });
  const [title, setTitle] = useState(event.title);
  const [date, setDate] = useState(toDateInputValue(event.startsAt));
  const [time, setTime] = useState(toTimeInputValue(event.startsAt));

  const id = useId();

  useEffect(() => {
    if (state.success) {
      onSuccess();
    }
  }, [state.success, onSuccess]);

  return (
    <form action={formAction} className="flex w-full flex-col gap-4">
      <input type="hidden" name="id" value={event.id} />
      <input
        type="hidden"
        name="startsAt"
        value={localDateTimeToISOString(date, time)}
      />

      <div className="flex flex-col gap-2">
        <Label htmlFor={`${id}-title`}>Title</Label>
        <Input
          id={`${id}-title`}
          name="title"
          required
          maxLength={200}
          value={title}
          onChange={(changeEvent) => setTitle(changeEvent.target.value)}
          placeholder="Event title"
          aria-invalid={state.error !== null}
          aria-describedby={state.error ? `${id}-error` : undefined}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${id}-date`}>Date</Label>
          <Input
            id={`${id}-date`}
            type="date"
            required
            value={date}
            onChange={(changeEvent) => setDate(changeEvent.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${id}-time`}>Time</Label>
          <Input
            id={`${id}-time`}
            type="time"
            required
            value={time}
            onChange={(changeEvent) => setTime(changeEvent.target.value)}
          />
        </div>
      </div>

      {state.error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      )}

      <DialogFooter>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save changes"}
        </Button>
      </DialogFooter>
    </form>
  );
}
