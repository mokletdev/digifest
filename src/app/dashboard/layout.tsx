import { getServerSession } from "@/lib/next-auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession();
  if (!session?.user) return redirect("/auth/login");

  return <>{children}</>;
}
