"use client";

import { Pencil } from "lucide-react";
import { useState } from "react";

import type { CalendarEvent } from "@/entities/event";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";

import { EditEventForm } from "./EditEventForm";

interface EditEventDialogProps {
  event: CalendarEvent;
}

export function EditEventDialog({ event }: EditEventDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="ghost" size="icon-sm" aria-label="Edit event" />
        }
      >
        <Pencil />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit event</DialogTitle>
        </DialogHeader>

        <EditEventForm event={event} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
