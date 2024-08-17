import { Montserrat } from "next/font/google";

import Toaster from "./_components/main/CustomToaster";
import NextAuthProvider from "./_components/main/NextAuthProvider";
import ProgressBarProvider from "./_components/main/ProgressBarProvider";

import type { Metadata, Viewport } from "next";

import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

const robots =
  process.env.APP_ENV != "production" ? "noindex, nofollow" : "index, follow";

export const metadata: Metadata = {
  title: {
    default: "Digifest - SMK Telkom Malang",
    template: "%s | Digifest",
  },
  description:
    "Digifest merupakan salah satu rangkaian acara dari Dis Natalies SMK Telkom Malang",
  keywords:
    "moklet, Moklet, Digifest, Telkom, SMK, Malang, SMK Telkom Malang, Olimawisa, MIFest, MI, Fest",
  authors: { name: "MokletDev", url: "https://dev.moklet.org" },
  creator: "MokletDev Team",
  publisher: "SMK Telkom Malang",
  robots: robots,
};

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
      <body className={montserrat.className + " overflow-x-hidden"}>
        <NextAuthProvider>
          <Toaster />
          <ProgressBarProvider>{children}</ProgressBarProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}

export const revalidate = 5400;
