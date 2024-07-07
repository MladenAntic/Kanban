import type { Metadata } from "next";
// eslint-disable-next-line camelcase
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { ThemeProvider } from "@/context/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kanban",
  description:
    "Kanban is not just another to-do list. It is an advanced task management app built to help you organize everything from groceries to enterprise level tasks.",
  keywords:
    "kanban, task management, to-do list, productivity, project management, task tracking, task manager, task app, board",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={plusJakartaSans.className}>
          <ThemeProvider>
            <main>{children}</main>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
