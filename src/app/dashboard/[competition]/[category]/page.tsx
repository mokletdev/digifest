import Link from "@/app/_components/global/button";
import { H1, H3, P } from "@/app/_components/global/text";
import { provideCompetitionAndCategory } from "@/database/utils";
import { getServerSession } from "@/lib/next-auth";
import prisma from "@/lib/prisma";
import { urlefy } from "@/utils/utils";
import { default as NextLink } from "next/link";
import { FaPlusCircle } from "react-icons/fa";
import { FaArrowLeft, FaArrowUpRightFromSquare } from "react-icons/fa6";

export default async function CompetitionCategoryDetail({
  params,
}: {
  params: { competition: string; category: string };
}) {
  const { category: categoryName, competition: competitionName } = params;

  const { category, competition } = await provideCompetitionAndCategory(
    competitionName,
    categoryName,
  );

  const session = await getServerSession();

  const [teams] = await prisma.$transaction([
    prisma.registered_team.findMany({
      where: {
        userId: session?.user?.id,
        registrationBatch: { competitionCategoryId: category.id },
      },
      include: {
        teamMembers: true,
      },
    }),
  ]);

  return (
    <main className="max-w-screen flex flex-col items-center justify-center px-5 py-20 md:px-8">
      <div className="w-full">
        <Link href="/dashboard" variant={"tertiary"} className="mb-2">
          <FaArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />{" "}
          Kembali ke dashboard utama
        </Link>
        <H1 className="mb-12">
          Tim Anda di {competition.name} bidang {category.name}
        </H1>
      </div>
      <div className="grid w-full grid-cols-1 gap-5 self-start md:grid-cols-2 xl:grid-cols-3 xl:gap-10">
        {teams.map((team) => (
          <NextLink
            key={team.id}
            href={`/dashboard/${urlefy(competitionName)}/${urlefy(categoryName)}/team/${team.id}`}
            className="group w-full"
          >
            <figure className="flex w-full items-center gap-5 rounded-[14px] border bg-primary-400 p-5 transition-all duration-300 group-hover:bg-primary-200">
              <div className="rounded-full bg-primary-50 p-4 text-primary-400">
                <FaArrowUpRightFromSquare />
              </div>
              <div className="block">
                <H3 className="text-white">Tim {team.teamName}</H3>
                <P className="text-white">
                  {team.teamMembers.length} anggota terdaftar
                </P>
              </div>
            </figure>
          </NextLink>
        ))}
        <NextLink
          href={`/dashboard/${urlefy(competitionName)}/${urlefy(categoryName)}/register`}
          className="group w-full"
        >
          <figure className="flex w-full items-center gap-5 rounded-[14px] border border-primary-400 bg-white p-5 transition-all duration-300 group-hover:bg-primary-50">
            <div className="rounded-full bg-primary-50 p-4 text-primary-400 transition-colors duration-300 group-hover:bg-white">
              <FaPlusCircle className="text-lg" />
            </div>
            <div className="block">
              <H3>Daftarkan Tim Baru</H3>
            </div>
          </figure>
        </NextLink>
      </div>
    </main>
  );
}
