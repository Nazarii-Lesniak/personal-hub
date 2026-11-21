import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

const AUTH_PAGES = ["/sign-in", "/sign-up"];

export function proxy(request: NextRequest) {
  const isAuthPage = AUTH_PAGES.includes(request.nextUrl.pathname);

  if (!isAuthPage && !getSessionCookie(request)) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|.*\\..*).*)"],
};
