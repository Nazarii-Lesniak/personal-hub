import { desc, eq } from "drizzle-orm";

import { db } from "@/shared/lib/db";
import { notes } from "@/shared/lib/db/schema";

export async function getNotes() {
  return db.select().from(notes).orderBy(desc(notes.createdAt));
}

export async function getNoteById(id: string) {
  const [note] = await db.select().from(notes).where(eq(notes.id, id)).limit(1);

  return note ?? null;
}

export async function createNote(content: string) {
  const [note] = await db.insert(notes).values({ content }).returning();

  return note;
}

export async function updateNote(id: string, content: string) {
  const [note] = await db
    .update(notes)
    .set({ content, updatedAt: new Date() })
    .where(eq(notes.id, id))
    .returning();

  return note ?? null;
}

export async function deleteNote(id: string) {
  const [note] = await db
    .delete(notes)
    .where(eq(notes.id, id))
    .returning({ id: notes.id });

  return note ?? null;
}
