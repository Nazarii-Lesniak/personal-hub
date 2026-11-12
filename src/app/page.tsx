import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex w-full flex-col items-center gap-2 text-center">
      <h1>Home Page</h1>
      <Link href="/notes" className="underline">
        Go to notes
      </Link>
    </main>
  );
}
