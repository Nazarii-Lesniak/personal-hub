import { Skeleton } from "@/shared/ui/skeleton";

export default function LoadingNotePage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 md:gap-6">
      <output className="sr-only">Loading note...</output>

      <div className="flex items-center justify-between gap-2">
        <Skeleton className="h-9 w-20" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>

      <Skeleton className="h-40 rounded-xl" />
    </div>
  );
}
