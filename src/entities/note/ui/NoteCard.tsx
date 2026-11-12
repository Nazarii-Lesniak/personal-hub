import Link from "next/link";
import type { ReactNode } from "react";
import { Card, CardContent, CardFooter } from "@/shared/ui/card";

interface NoteCardProps {
  children?: ReactNode;
  showBack?: boolean;
}

export function NoteCard({ children, showBack = false }: NoteCardProps) {
  return (
    <Card
      className={`flex w-full max-w-80 flex-col bg-cyan-100 ${
        showBack ? "min-h-40" : "h-40"
      }`}
    >
      <CardContent className="flex flex-1 items-center justify-center text-center">
        {children}
      </CardContent>

      {showBack && (
        <CardFooter className="flex w-full shrink-0 justify-center bg-cyan-200">
          <Link href="/notes" className="flex w-full justify-center">
            Back
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
