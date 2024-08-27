import Link from "@/app/_components/global/button";
import { getServerSession } from "@/lib/next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import LoginForm from "./_components/form";

export default async function Login() {
  const session = await getServerSession();
  if (session) return redirect("/");

  return (
    <main className="flex min-h-screen w-screen items-center justify-center">
      <section className="flex w-full max-w-[1440px] items-center justify-between p-12">
        <div className="block w-full max-w-full xl:max-w-[460px]">
          <Link href="/" variant={"tertiary"}>
            <FaArrowLeft /> Kembali
          </Link>
          <LoginForm />
        </div>
        <Image
          src={"/login.svg"}
          alt="Login image"
          width={532}
          height={649}
          className="hidden xl:block"
        />
      </section>
    </main>
  );
}
