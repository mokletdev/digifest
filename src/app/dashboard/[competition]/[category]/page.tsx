import Link from "@/app/_components/global/button";
import {
  findActiveStage,
  provideCompetitionAndCategory,
} from "@/database/utils";
import { getServerSession } from "@/lib/next-auth";
import prisma from "@/lib/prisma";
import { FaArrowLeft } from "react-icons/fa6";
import Wrapper from "./_components/wrapper";
import { GreetingBoard, TeamMembers, Timeline } from "./parts";

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
  const activeStage = await findActiveStage(category.id);

  const [announcements, stages, team, batches] = await prisma.$transaction([
    prisma.announcement.findMany({
      where: { stage: { competitionCategoryId: category.id } },
      include: { stage: true },
    }),
    prisma.stage.findMany({
      where: { competitionCategory: { id: category.id } },
    }),
    prisma.registered_team.findFirst({
      where: {
        AND: {
          registeredBy: { id: session?.user?.id },
          registrationBatch: { competitionCategoryId: category.id },
        },
      },
      include: { teamMembers: true },
    }),
    prisma.registration_batch.findMany({
      where: { competitionCategoryId: category.id },
    }),
  ]);

  return (
    <Wrapper value={{ category, competition }}>
      <main className="mx-auto max-w-[1169px] px-5 py-10">
        <Link href="/dashboard" variant={"secondary"} className="mb-10">
          <FaArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />{" "}
          Kembali ke dashboard utama
        </Link>
        <GreetingBoard
          team={team!}
          announcements={announcements}
          activeStage={activeStage}
        />
        <Timeline
          categoryName={category.name}
          stages={stages}
          batches={batches}
        />
        <TeamMembers team={team!} />
      </main>
    </Wrapper>
  );
}
