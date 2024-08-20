import Link from "@/app/_components/global/button";
import { H2, P } from "@/app/_components/global/text";
import { getServerSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa6";

export default async function AfterRegister() {
  const session = await getServerSession();
  if (!session?.user) return redirect("/");

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
        <Link href="/" variant={"tertiary"}>
          <FaArrowLeft /> Kembali ke halaman masuk
        </Link>
      </div>
    </main>
  );
}
