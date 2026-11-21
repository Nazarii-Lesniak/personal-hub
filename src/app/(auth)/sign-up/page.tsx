import type { Metadata } from "next";

import { SignUpForm } from "@/features/sign-up";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { PageTransition } from "@/shared/ui/page-transition";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function SignUpPage() {
  return (
    <PageTransition>
      <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Create an account</CardTitle>
          </CardHeader>
          <CardContent>
            <SignUpForm />
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}
