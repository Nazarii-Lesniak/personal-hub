"use client";

import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useOptimistic, useState, useTransition } from "react";

import type { CalendarEvent } from "@/entities/event";
import { CreateEventDialog } from "@/features/create-event";
import { DeleteEventForm } from "@/features/delete-event";
import { EditEventDialog } from "@/features/edit-event";
import { toDateInputValue } from "@/shared/lib/date/local-datetime";
import { formatMonthParam, parseMonthParam } from "@/shared/lib/date/month";
import { useIsClient } from "@/shared/lib/hooks/use-is-client";
import { cn } from "@/shared/lib/utils";
import { Calendar } from "@/shared/ui/calendar";
import { Card, CardContent } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

import { getEventsForDay, getSelectedDate } from "../model/calendar-day";
import { GroupedEventList } from "./GroupedEventList";

interface CalendarViewProps {
  month: string;
  events: CalendarEvent[];
  hasActiveQuery?: boolean;
}

export function CalendarView({
  month,
  events,
  hasActiveQuery = false,
}: CalendarViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isClient = useIsClient();
  const [isPending, startTransition] = useTransition();
  const [optimisticMonth, setOptimisticMonth] = useOptimistic(month);
  const [pickedDate, setPickedDate] = useState<Date>();
  const [today] = useState(() => new Date());

  const visibleMonth = parseMonthParam(optimisticMonth);
  const selectedDate = getSelectedDate(pickedDate, visibleMonth, today);
  const selectedDayEvents = getEventsForDay(events, selectedDate);

  function handleMonthChange(nextMonth: Date) {
    const value = formatMonthParam(nextMonth);
    const params = new URLSearchParams(searchParams.toString());
    params.set("month", value);

    startTransition(() => {
      setOptimisticMonth(value);
      router.push(`/calendar?${params.toString()}`, { scroll: false });
    });
  }

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[auto_1fr] lg:gap-8">
      <Card className="w-fit max-w-full">
        <CardContent>
          <Calendar
            mode="single"
            required
            weekStartsOn={1}
            showOutsideDays={false}
            month={visibleMonth}
            onMonthChange={handleMonthChange}
            selected={selectedDate}
            onSelect={setPickedDate}
            modifiers={{
              hasEvents: isClient ? events.map((e) => e.startsAt) : [],
            }}
            modifiersClassNames={{
              hasEvents:
                "font-semibold after:pointer-events-none after:absolute after:bottom-1 after:left-1/2 after:size-1 after:-translate-x-1/2 after:rounded-full after:bg-cyan-700",
            }}
          />
        </CardContent>
      </Card>

      <section
        aria-labelledby="selected-day-heading"
        className="flex min-w-0 flex-col gap-4"
      >
        <div className="flex items-center justify-between gap-4">
          {isClient ? (
            <h2
              id="selected-day-heading"
              className="text-lg font-semibold tracking-tight md:text-xl"
            >
              {format(selectedDate, "EEEE, d MMMM yyyy")}
            </h2>
          ) : (
            <Skeleton className="h-7 w-56" />
          )}
          <CreateEventDialog defaultDate={toDateInputValue(selectedDate)} />
        </div>

        <div className={cn("transition-opacity", isPending && "opacity-60")}>
          {isClient ? (
            hasActiveQuery ? (
              <GroupedEventList events={events} />
            ) : (
              <EventList events={selectedDayEvents} />
            )
          ) : (
            <Skeleton className="h-16 rounded-xl" />
          )}
        </div>
      </section>
    </div>
  );
}

interface EventListProps {
  events: CalendarEvent[];
  hasActiveQuery?: boolean;
}

function EventList({ events, hasActiveQuery }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">
        {hasActiveQuery
          ? "No matching events for this day."
          : "No events for this day."}
      </div>
    );
  }

  return (
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
  );
}
