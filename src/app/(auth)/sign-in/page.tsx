import type { Metadata } from "next";

import { SignInForm } from "@/features/sign-in";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { PageTransition } from "@/shared/ui/page-transition";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function SignInPage() {
  return (
    <PageTransition>
      <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Sign in</CardTitle>
          </CardHeader>
          <CardContent>
            <SignInForm />
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}
