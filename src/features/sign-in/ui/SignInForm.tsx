"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

import { authClient } from "@/shared/lib/auth/client";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

import type { SignInState } from "../model/sign-in.types";

const initialState: SignInState = {
  error: null,
  email: "",
};

export function SignInForm() {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    async (
      _prevState: SignInState,
      formData: FormData,
    ): Promise<SignInState> => {
      const rawEmail = formData.get("email");
      const rawPassword = formData.get("password");
      const email = typeof rawEmail === "string" ? rawEmail.trim() : "";
      const password = typeof rawPassword === "string" ? rawPassword : "";

      const { error } = await authClient.signIn.email({ email, password });

      if (error) {
        return { error: error.message ?? "Failed to sign in", email };
      }

      router.replace("/notes");
      router.refresh();

      return { error: null, email };
    },
    initialState,
  );

  return (
    <form action={formAction} className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={state.email}
          aria-invalid={state.error !== null}
          aria-describedby={state.error ? "sign-in-error" : undefined}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          aria-invalid={state.error !== null}
          aria-describedby={state.error ? "sign-in-error" : undefined}
        />
      </div>

      {state.error && (
        <p id="sign-in-error" role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      )}

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Signing in..." : "Sign in"}
      </Button>

      <p className="text-end text-sm text-muted-foreground">
        No account yet?{" "}
        <Link
          href="/sign-up"
          className="font-semibold hover:underline underline-offset-4"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}
