import Link from "next/link";

import { Button } from "@/shared/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-xl font-semibold md:text-2xl">Page not found</h2>
      <p className="text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Button variant="outline" nativeButton={false} render={<Link href="/" />}>
        Return home
      </Button>
    </div>
  );
}
