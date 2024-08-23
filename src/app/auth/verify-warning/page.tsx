import Link from "@/app/_components/global/button";
import { H2, P } from "@/app/_components/global/text";
import { findUser } from "@/database/user.query";
import { getServerSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa6";

export default async function AfterRegister() {
  const session = await getServerSession();
  if (!session?.user) return redirect("/");

  const user = await findUser({ id: session.user.id });
  if (user?.verified) {
    if (user.role === "ADMIN" || user.role === "SUPERADMIN") {
      return redirect("/admin");
    }

    return redirect("/dashboard");
  }

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="mb-8 inline-block rounded-full bg-primary-50 p-[18px] text-primary-400">
          <FaEnvelope />
        </div>
        <H2 className="mb-3">Cek Email Anda</H2>
        <P className="mb-[34px]">
          Konfirmasi akun anda pada email {session?.user?.email}
        </P>
        <Link href="/" variant={"primary"}>
          <FaArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />{" "}
          Kembali ke halaman utama
        </Link>
      </div>
    </main>
  );
}
