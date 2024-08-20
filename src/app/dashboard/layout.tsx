import { getServerSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession();
  if (!session?.user) return redirect("/auth/login");

  return <>{children}</>;
}
