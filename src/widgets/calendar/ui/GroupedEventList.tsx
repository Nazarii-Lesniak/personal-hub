"use client";

import { format, parseISO } from "date-fns";

import type { CalendarEvent } from "@/entities/event";
import { DeleteEventForm } from "@/features/delete-event";
import { EditEventDialog } from "@/features/edit-event";

import { groupEventsByDay } from "../model/calendar-day";

interface GroupedEventListProps {
  events: CalendarEvent[];
}

export function GroupedEventList({ events }: GroupedEventListProps) {
  const groups = groupEventsByDay(events);

  if (groups.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">
        No matching events this month.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {groups.map(({ date, events }) => (
        <section key={date} className="flex flex-col gap-3">
          <h3 className="font-semibold tracking-tight">
            {format(parseISO(date), "EEEE, d MMMM")}
          </h3>

          <ul className="flex flex-col gap-2">
            {events.map((event) => (
              <li
                key={event.id}
                className="flex items-center gap-3 rounded-xl border p-3"
              >
                <time
                  dateTime={event.startsAt.toISOString()}
                  className="w-12 shrink-0 text-sm font-medium text-muted-foreground tabular-nums"
                >
                  {format(event.startsAt, "HH:mm")}
                </time>

                <p className="min-w-0 flex-1 text-sm wrap-break-word">
                  {event.title}
                </p>

                <div className="flex shrink-0 items-center">
                  <EditEventDialog event={event} />
                  <DeleteEventForm id={event.id} />
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
