import type { Metadata } from "next";
import { Suspense } from "react";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import AppShell from "../components/layout/AppShell";
import Loader from "../components/layout/Loader";
import SmoothScroll from "../components/ui/SmoothScroll";
import ScrollProgressBar from "../components/ui/ScrollProgressBar";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SmartSplit - Bill Splitting App",
  description: "The smartest way to track shared expenses for travel, dining, and daily life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className={montserrat.className}>
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
