import { format, isSameDay, isSameMonth } from "date-fns";

import type { CalendarEvent } from "@/entities/event";

export function getSelectedDate(
  pickedDate: Date | undefined,
  visibleMonth: Date,
  today: Date,
) {
  if (pickedDate && isSameMonth(pickedDate, visibleMonth)) {
    return pickedDate;
  }

  if (isSameMonth(today, visibleMonth)) {
    return today;
  }

  return visibleMonth;
}

export function getEventsForDay(events: CalendarEvent[], day: Date) {
  return events.filter((event) => isSameDay(event.startsAt, day));
}

export function groupEventsByDay(events: CalendarEvent[]) {
  const groups = new Map<string, CalendarEvent[]>();

  for (const event of events) {
    const day = format(event.startsAt, "yyyy-MM-dd");
    const dayEvents = groups.get(day) ?? [];

    dayEvents.push(event);
    groups.set(day, dayEvents);
  }

  return Array.from(groups.entries()).map(([date, events]) => ({
    date,
    events,
  }));
}
