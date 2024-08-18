import { Display } from "@/app/_components/global/text";
import { findUser } from "@/database/user.query";
import { getServerSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";

export default async function VerifyEmail({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const session = await getServerSession();
  if (!session?.user) return redirect("/auth/login");

  const currentUser = await findUser({ id: session.user.id });
  if (currentUser?.verified) return redirect("/");

  if (currentUser?.verificationToken !== searchParams.token)
    return <Display>Token invalid!</Display>;

  return <Display>Berhasil memverifikasi!</Display>;
}
