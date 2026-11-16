import Link from "next/link";

import { Button } from "@/shared/ui/button";
import { PageTransition } from "@/shared/ui/page-transition";

export default function HomePage() {
  return (
    <PageTransition>
      <section className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          Personal Hub
        </h1>
        <p className="max-w-md text-muted-foreground md:text-lg">
          A simple space to organize your notes.
        </p>
        <Button size="lg" nativeButton={false} render={<Link href="/notes" />}>
          Open notes
        </Button>
      </section>
    </PageTransition>
  );
}
