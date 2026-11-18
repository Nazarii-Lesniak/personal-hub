import { Skeleton } from "@/shared/ui/skeleton";

export default function LoadingCalendarPage() {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <output className="sr-only">Loading calendar...</output>

      <Skeleton className="h-8 w-36 md:h-9" />

      <div className="grid items-start gap-6 lg:grid-cols-[auto_1fr] lg:gap-8">
        <Skeleton className="h-80 w-full rounded-xl lg:w-80" />

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <Skeleton className="h-7 w-56" />
            <Skeleton className="h-9 w-32" />
          </div>
          <Skeleton className="h-16 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
