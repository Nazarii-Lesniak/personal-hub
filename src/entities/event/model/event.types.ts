import type { events } from "@/shared/lib/db/schema";

export type CalendarEvent = typeof events.$inferSelect;
