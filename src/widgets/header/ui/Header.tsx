import Link from "next/link";
import { Suspense } from "react";

import { Button } from "@/shared/ui/button";

import { UserMenu } from "./UserMenu";

export function Header() {
  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur"
    >
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6 md:h-16 lg:px-8">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight transition-opacity hover:opacity-70 md:text-xl"
        >
          PersonalHub
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1">
          <Button
            variant="ghost"
            nativeButton={false}
            render={<Link href="/notes" />}
          >
            Notes
          </Button>
          <Button
            variant="ghost"
            nativeButton={false}
            render={<Link href="/calendar" />}
          >
            Calendar
          </Button>

          <div className="ml-3 flex items-center">
            <Suspense fallback={null}>
              <UserMenu />
            </Suspense>
          </div>
        </nav>
      </div>
    </header>
  );
}
