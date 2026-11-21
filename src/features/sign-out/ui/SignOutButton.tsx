"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { authClient } from "@/shared/lib/auth/client";
import { Button } from "@/shared/ui/button";

export function SignOutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      await authClient.signOut();

      router.replace("/sign-in");
      router.refresh();
    });
  }

  return (
    <Button
      type="button"
      variant="destructive"
      disabled={isPending}
      onClick={handleClick}
    >
      {isPending ? "Signing out..." : "Sign out"}
    </Button>
  );
}
