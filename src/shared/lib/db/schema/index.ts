import { index, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const notes = pgTable("notes", {
  id: uuid("id").defaultRandom().primaryKey(),
  content: varchar("content", { length: 10_000 }).notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});

export const events = pgTable(
  "events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 200 }).notNull(),
    startsAt: timestamp("starts_at", {
      withTimezone: true,
    }).notNull(),
    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [index("events_starts_at_idx").on(table.startsAt)],
);
