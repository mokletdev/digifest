import { FaArrowLeft, FaX } from "react-icons/fa6";
import { H2, P } from "../_components/global/text";
import Link from "../_components/global/button";

export default function Unauthorized() {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="mb-8 inline-block rounded-full bg-primary-50 p-[18px] text-primary-400">
          <FaX />
        </div>
        <H2 className="mb-3">403</H2>
        <P className="mb-[34px]">Anda tidak memiliki Akses pada halaman ini</P>
        <Link href="javascript:history.back()" variant={"primary"}>
          <FaArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />{" "}
          Kembali
        </Link>
      </div>
    </main>
  );
}
