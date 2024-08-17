"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Auth() {
  const { status } = useSession();

  if (status === "authenticated") return redirect("/");
  if (status === "unauthenticated") return redirect("/auth/login");

  return <></>;
}
