import React from "react";
import { Metadata } from "next";

import AdminLayout from "./_components/admin-layout";

export const metadata: Metadata = {
  title: "Admin Panel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}

export const revalidate = 900;
