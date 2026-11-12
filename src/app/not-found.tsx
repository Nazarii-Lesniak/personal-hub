import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[50vh] w-full flex-col items-center justify-center gap-4">
      <h2>404 - Page Not Found</h2>
      <Link href="/" className="underline">
        Return Home
      </Link>
    </main>
  );
}
