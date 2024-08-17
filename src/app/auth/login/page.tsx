"use client";

import { Display } from "@/app/_components/global/text";
import { getServerSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";
import LoginForm from "./_components/form";

export default async function Login() {
  const session = await getServerSession();
  if (session) return redirect("/");

  return (
    <>
      <Display>Masuk</Display>
      <div className="flex items-center gap-2">
        <LoginForm />
      </div>
    </>
  );
}
