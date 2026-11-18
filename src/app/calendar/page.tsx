import type { Metadata } from "next";

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

export default async function CalendarPage({
  searchParams,
}: CalendarPageProps) {
  const { month } = await searchParams;

  const monthResult = eventMonthSchema.safeParse(month);
  const currentMonth = monthResult.success
    ? monthResult.data
    : formatMonthParam(new Date());

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
