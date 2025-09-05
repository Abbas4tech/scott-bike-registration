import React from "react";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

import "./globals.css";
import Providers from "@/components/Provider";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SCOTT Sports | The Best in Cycling, Skiing, Running & Moto | Scott",
  description:
    "SCOTT Sports pushes the limits of innovation, technology and design to develop some of the best bikes, ski, running and motosports equipment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="en">
      <body className={`${openSans.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
