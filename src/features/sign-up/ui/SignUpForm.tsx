"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

import { authClient } from "@/shared/lib/auth/client";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

import type { SignUpState } from "../model/sign-up.types";

const initialState: SignUpState = {
  error: null,
  name: "",
  email: "",
};

export function SignUpForm() {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    async (
      _prevState: SignUpState,
      formData: FormData,
    ): Promise<SignUpState> => {
      const rawName = formData.get("name");
      const rawEmail = formData.get("email");
      const rawPassword = formData.get("password");
      const name = typeof rawName === "string" ? rawName.trim() : "";
      const email = typeof rawEmail === "string" ? rawEmail.trim() : "";
      const password = typeof rawPassword === "string" ? rawPassword : "";

      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        return { error: error.message ?? "Failed to sign up", name, email };
      }

      router.replace("/notes");
      router.refresh();

      return { error: null, name, email };
    },
    initialState,
  );

  return (
    <form action={formAction} className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          autoComplete="name"
          required
          maxLength={100}
          defaultValue={state.name}
        />
      </div>

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
          aria-describedby={state.error ? "sign-up-error" : undefined}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          maxLength={128}
          aria-invalid={state.error !== null}
          aria-describedby={state.error ? "sign-up-error" : undefined}
        />
      </div>

      {state.error && (
        <p id="sign-up-error" role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      )}

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Creating account..." : "Sign up"}
      </Button>

      <p className="text-end text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-semibold hover:underline underline-offset-4"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
