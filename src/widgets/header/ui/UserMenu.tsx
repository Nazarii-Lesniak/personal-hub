import { SignOutButton } from "@/features/sign-out";
import { getCurrentUser } from "@/shared/lib/auth/server";

export async function UserMenu() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center gap-1">
      <span className="hidden max-w-32 truncate text-sm text-muted-foreground sm:inline">
        {user.name}
      </span>
      <SignOutButton />
    </div>
  );
}
