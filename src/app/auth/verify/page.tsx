import Link from "@/app/_components/global/button";
import { Display, H2, P } from "@/app/_components/global/text";
import { findUser, updateUser } from "@/database/user.query";
import { getServerSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";
import { FaArrowLeft, FaCheck } from "react-icons/fa";

export default async function VerifyEmail({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const session = await getServerSession();
  if (!session?.user) return redirect("/auth/login");

  const currentUser = await findUser({ id: session.user.id });
  if (
    currentUser?.verified ||
    currentUser?.verificationToken !== searchParams.token
  )
    return redirect("/dashboard");

  // Update the verified property of the user
  await updateUser({ id: currentUser?.id }, { verified: true });

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="mb-8 inline-block rounded-full bg-primary-50 p-[18px] text-primary-400">
          <FaCheck />
        </div>
        <H2 className="mb-3">Berhasil Memverifikasi Email</H2>
        <P className="mb-[34px]">
          Akun dengan email {session?.user?.email} berhasil diverifikasi!
        </P>
        <Link href="/" variant={"primary"}>
          <FaArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />{" "}
          Kembali ke halaman utama
        </Link>
      </div>
    </main>
  );
}
