import type { ReactNode } from "react";
import { Card, CardContent } from "@/shared/ui/card";

interface NoteCardProps {
  children?: ReactNode;
}

export function NoteCard({ children }: NoteCardProps) {
  return (
    <Card className="flex items-center justify-center w-full max-w-80 bg-cyan-100">
      <CardContent>{children}</CardContent>
    </Card>
  );
}
