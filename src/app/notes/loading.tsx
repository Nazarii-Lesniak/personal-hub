import { Skeleton } from "@/shared/ui/skeleton";

const PLACEHOLDER_IDS = ["a", "b", "c", "d", "e", "f"];

export default function LoadingNotesListPage() {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <output className="sr-only">Loading notes...</output>

      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-8 w-28 md:h-9" />
        <Skeleton className="h-8 w-110 md:h-9" />
        <Skeleton className="h-9 w-32" />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6">
        {PLACEHOLDER_IDS.map((id) => (
          <Skeleton key={id} className="h-40 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
