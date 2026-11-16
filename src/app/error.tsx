"use client";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <h2>Something went wrong: {error.message}</h2>
      <button type="button" onClick={() => reset()} className="cursor-pointer">
        Try again
      </button>
    </div>
  );
}
