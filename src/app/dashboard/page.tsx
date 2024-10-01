import { getServerSession } from "@/lib/next-auth";
import prisma from "@/lib/prisma";
import { FaArrowLeft } from "react-icons/fa6";
import Link from "../_components/global/button";
import Wrapper from "./_components/wrapper";
import { Competition, GreetingBoard } from "./parts";
import { H3 } from "../_components/global/text";

export default async function Dashboard() {
  const session = await getServerSession();

  const [user, competitions, registrations] = await prisma.$transaction([
    prisma.user.findUnique({
      where: { id: session?.user?.id },
      select: { name: true, verified: true },
    }),
    prisma.competition.findMany({
      include: {
        competitionCategories: {
          include: { registrationBatches: true, stages: true },
        },
      },
    }),
    prisma.registered_team.findMany({
      where: { userId: session?.user?.id },
      include: {
        registrationBatch: {
          include: {
            competitionCategory: { include: { competition: true } },
          },
        },
      },
    }),
  ]);

  return (
    <Wrapper value={{ user: user!, competitions, registrations }}>
      <main className="mx-auto max-w-[1169px] px-5 pt-10">
        <Link href="/" variant={"secondary"} className="mb-10">
          <FaArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />{" "}
          Kembali ke halaman utama
        </Link>
        <GreetingBoard />
        {registrations.length === 0 ? (
          <div className="flex h-full w-full items-center justify-center py-[82px]">
            <H3>Anda tidak mendaftarkan tim di kompetisi apapun.</H3>
          </div>
        ) : (
          <Competition />
        )}
      </main>
    </Wrapper>
  );
}
