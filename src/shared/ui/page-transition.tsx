import type { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <div className="flex flex-1 flex-col animate-in duration-300 fade-in slide-in-from-bottom-2 motion-reduce:animate-none">
      {children}
    </div>
  );
}
