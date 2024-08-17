import { Display } from "@/app/_components/global/text";
import RegisterForm from "./_components/form";
import { getServerSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";

export default async function Register() {
  const session = await getServerSession();
  if (session) return redirect("/");

  return (
    <>
      <Display>Daftar</Display>
      <div className="flex items-center gap-2">
        <RegisterForm />
      </div>
    </>
  );
}
