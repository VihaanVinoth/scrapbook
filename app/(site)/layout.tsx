import type { Metadata } from "next";

import Nav from "@/components/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scrapbook",
  description: "Scrapbook",
};

export default function RootLayout({
  children,
}: Readonly <{
  children: React.ReactNode;
}>) {
  <html lang="en" className="h-full antialised">
    <body>
      <Nav />
      {children}
    </body>
  </html>
}