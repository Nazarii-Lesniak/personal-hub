import type { Metadata } from "next";
import { connection } from "next/server";

import { eventMonthSchema, getEventsByMonth } from "@/entities/event";
import { formatMonthParam } from "@/shared/lib/date/month";
import { PageTransition } from "@/shared/ui/page-transition";
import { CalendarView } from "@/widgets/calendar";

export const metadata: Metadata = {
  title: "Calendar",
};

interface CalendarPageProps {
  searchParams: Promise<{ month?: string | string[] }>;
}

async function resolveMonth(value: string | string[] | undefined) {
  const result = eventMonthSchema.safeParse(value);

  if (result.success) {
    return result.data;
  }

  await connection();

  return formatMonthParam(new Date());
}

export default async function CalendarPage({
  searchParams,
}: CalendarPageProps) {
  const { month } = await searchParams;

  const currentMonth = await resolveMonth(month);
  const events = await getEventsByMonth(currentMonth);

  return (
    <PageTransition>
      <div className="flex flex-col gap-6 md:gap-8">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Calendar
        </h1>

        <CalendarView month={currentMonth} events={events} />
      </div>
    </PageTransition>
  );
}
