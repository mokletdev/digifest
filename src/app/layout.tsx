import Toaster from "./_components/main/custom-toaster";
import NextAuthProvider from "./_components/main/next-auth-provider";
import ProgressBarProvider from "./_components/main/progress-bar-provider";

import type { Metadata, Viewport } from "next";

import "./globals.css";
import clashDisplayFont from "./font";
import cn from "@/lib/cn";
import { metadata as metadataConfig } from "@/utils/seo.config";

export const metadata: Metadata = metadataConfig;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(clashDisplayFont.className + " overflow-x-hidden")}>
        <NextAuthProvider>
          <Toaster />
          <ProgressBarProvider>{children}</ProgressBarProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
