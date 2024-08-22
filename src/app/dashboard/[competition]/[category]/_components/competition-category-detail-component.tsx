import Link from "@/app/_components/global/button";
import { findActiveStage } from "@/database/utils";
import { getServerSession } from "@/lib/next-auth";
import prisma from "@/lib/prisma";
import { FaArrowLeft } from "react-icons/fa6";
import { CompetitionCategoryDetailValues } from "../contexts";
import { GreetingBoard, TeamMembers, Timeline } from "../parts";

// TODO: implmenet this
// - Announcement Done
// - Guidebook
// - Countdown endDate stage
// - Stages
// - Team Members

export default async function CompetitionCategoryDetailComponent({
  category,
  competition,
}: CompetitionCategoryDetailValues) {
  const session = await getServerSession();
  const activeStage = await findActiveStage(category.id);

  const [announcements, stages, team] = await prisma.$transaction([
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
  ]);

  return (
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
      <Timeline categoryName={category.name} stages={stages} />
      <TeamMembers teamMembers={team?.teamMembers!} />
    </main>
  );
}
