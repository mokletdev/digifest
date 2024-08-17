import React from "react";
import { Metadata } from "next";

import AdminLayout from "./components/AdminLayout";

export const metadata: Metadata = {
  title: "Admin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}

export const revalidate = 900;
