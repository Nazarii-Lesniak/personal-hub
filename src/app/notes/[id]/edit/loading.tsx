import { Skeleton } from "@/shared/ui/skeleton";

export default function LoadingEditNotePage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 md:gap-6">
      <output className="sr-only">Loading note...</output>

      <Skeleton className="h-9 w-24" />
      <Skeleton className="h-8 w-40 md:h-9" />
      <Skeleton className="h-40 rounded-xl sm:h-52 md:h-64" />
    </div>
  );
}
