import { and, asc, eq, gte, lt } from "drizzle-orm";

import { db } from "@/shared/lib/db";
import { events } from "@/shared/lib/db/schema";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

export async function getEventsByMonth(month: string) {
  const [year, monthNumber] = month.split("-").map(Number);

  const from = new Date(Date.UTC(year, monthNumber - 1, 1) - DAY_IN_MS);
  const to = new Date(Date.UTC(year, monthNumber, 1) + DAY_IN_MS);

  return db
    .select()
    .from(events)
    .where(and(gte(events.startsAt, from), lt(events.startsAt, to)))
    .orderBy(asc(events.startsAt));
}

export async function createEvent(title: string, startsAt: Date) {
  const [event] = await db
    .insert(events)
    .values({ title, startsAt })
    .returning();

  return event;
}

export async function updateEvent(id: string, title: string, startsAt: Date) {
  const [event] = await db
    .update(events)
    .set({ title, startsAt, updatedAt: new Date() })
    .where(eq(events.id, id))
    .returning();

  return event ?? null;
}

export async function deleteEvent(id: string) {
  const [event] = await db.delete(events).where(eq(events.id, id)).returning();

  return event ?? null;
}
