"use client";

import { useActionState, useEffect, useId, useState } from "react";

import { localDateTimeToISOString } from "@/shared/lib/date/local-datetime";
import { Button } from "@/shared/ui/button";
import { DialogFooter } from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

import { createEventAction } from "../api/create-event.action";
import type { CreateEventState } from "../model/create-event.types";

const initialState: CreateEventState = {
  error: null,
  success: false,
};

interface CreateEventFormProps {
  defaultDate: string;
  onSuccess: () => void;
}

export function CreateEventForm({
  defaultDate,
  onSuccess,
}: CreateEventFormProps) {
  const [state, formAction, isPending] = useActionState(
    createEventAction,
    initialState,
  );

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(defaultDate);
  const [time, setTime] = useState("09:00");

  const id = useId();

  useEffect(() => {
    if (state.success) {
      onSuccess();
    }
  }, [state.success, onSuccess]);

  return (
    <form action={formAction} className="flex w-full flex-col gap-4">
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
          onChange={(event) => setTitle(event.target.value)}
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
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${id}-time`}>Time</Label>
          <Input
            id={`${id}-time`}
            type="time"
            required
            value={time}
            onChange={(event) => setTime(event.target.value)}
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
          {isPending ? "Creating..." : "Create event"}
        </Button>
      </DialogFooter>
    </form>
  );
}
