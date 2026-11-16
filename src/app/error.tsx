"use client";

import { Button } from "@/shared/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-xl font-semibold md:text-2xl">
        Something went wrong
      </h2>
      <p className="text-muted-foreground">Please try again.</p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
