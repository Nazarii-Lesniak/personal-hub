import { isSameDay, isSameMonth } from "date-fns";

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
