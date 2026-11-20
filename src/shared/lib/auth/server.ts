import "server-only";

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

import { db } from "../db";
import { account, rateLimit, session, user, verification } from "../db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { user, session, account, verification, rateLimit },
  }),
  emailAndPassword: { enabled: true },
  rateLimit: { storage: "database" },
});

const getSession = cache(async () =>
  auth.api.getSession({ headers: await headers() }),
);

export async function getCurrentUser() {
  const currentSession = await getSession();

  return currentSession?.user ?? null;
}

export async function requireUser() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/sign-in");
  }

  return currentUser;
}
