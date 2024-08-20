import { getServerSession } from "@/lib/next-auth";
import prisma from "@/lib/prisma";
import { FaArrowLeft } from "react-icons/fa";
import Link from "../_components/global/button";
import { Competition, GreetingBoard } from "./parts";

export default async function Dashboard() {
  const session = await getServerSession();
  const [competitions] = await prisma.$transaction([
    prisma.competition.findMany({
      include: {
        competitionCategories: {
          include: { registrationBatches: true, stages: true },
        },
      },
    }),
  ]);

  return (
    <main className="mx-auto max-w-[1169px] px-5 pt-10">
      <Link href="/" variant={"secondary"} className="mb-10">
        <FaArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />{" "}
        Kembali ke halaman utama
      </Link>
      <GreetingBoard name={session?.user?.name!} />
      <Competition competitions={competitions} />
    </main>
  );
}
