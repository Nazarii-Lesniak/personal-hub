import { Card, CardContent } from "@/shared/ui/card";

interface NoteCardProps {
  content: string;
}

export function NoteCard({ content }: NoteCardProps) {
  return (
    <Card className="h-40 transition duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-foreground/20 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <CardContent>
        <p className="line-clamp-5 text-sm wrap-break-word whitespace-pre-wrap md:text-base">
          {content}
        </p>
      </CardContent>
    </Card>
  );
}
