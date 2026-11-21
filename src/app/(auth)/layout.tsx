import { redirect } from "next/navigation";
import { type ReactNode, Suspense } from "react";

import { getCurrentUser } from "@/shared/lib/auth/server";

async function RedirectIfSignedIn() {
  if (await getCurrentUser()) {
    redirect("/notes");
  }

  return null;
}

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <RedirectIfSignedIn />
      </Suspense>
      {children}
    </>
  );
}
