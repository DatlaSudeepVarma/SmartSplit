import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { Providers } from "./providers";
import AppShell from "../components/layout/AppShell";
import Loader from "../components/layout/Loader";
import SmoothScroll from "../components/ui/SmoothScroll";
import ScrollProgressBar from "../components/ui/ScrollProgressBar";

export const metadata: Metadata = {
  title: "SmartSplit",
  description: "The smartest way to track shared expenses for travel, dining, and daily life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <SmoothScroll>
            <ScrollProgressBar />
            <Loader />
            <Suspense fallback={<main className="min-h-screen pt-14 sm:pt-16">{children}</main>}>
              <AppShell>{children}</AppShell>
            </Suspense>
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
