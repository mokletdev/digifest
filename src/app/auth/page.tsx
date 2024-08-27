import { getServerSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";

export default async function Auth() {
  const session = await getServerSession();

  if (session?.user) return redirect("/");
  if (!session?.user) return redirect("/auth/login");

  return <></>;
}
