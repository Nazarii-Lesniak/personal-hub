import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";

import { cn } from "@/shared/lib/utils";
import { Header } from "@/widgets/header";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "Personal Hub",
    template: "%s | Personal Hub",
  },
  description: "A simple space to organize your notes",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="flex min-h-dvh flex-col">
        <Header />
        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-6 sm:px-6 md:py-8 lg:px-8 xl:py-10">
          {children}
        </main>
      </body>
    </html>
  );
}
