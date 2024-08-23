import { FaArrowLeft } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import Link from "./_components/global/button";
import { H2, P } from "./_components/global/text";

export default function NotFound() {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="mb-8 inline-block rounded-full bg-primary-50 p-[18px] text-primary-400">
          <FaX />
        </div>
        <H2 className="mb-3">404</H2>
        <P className="mb-[34px]">Halaman ini tidak ditemukan</P>
        <Link href="/" variant={"primary"}>
          <FaArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />{" "}
          Kembali ke halaman utama
        </Link>
      </div>
    </main>
  );
}
