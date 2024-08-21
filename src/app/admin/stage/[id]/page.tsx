import { H2, P } from "@/app/_components/global/text";
import prisma from "@/lib/prisma";
import CategoriesTable from "./_components/table";
import { notFound } from "next/navigation";

export default async function Stage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  const stageId = params.id;

  const [stageWithTeam, teamsOnThisCategory] = await prisma.$transaction([
    prisma.stage.findUnique({
      include: { teams: true, competitionCategory: { select: { name: true } } },
      where: { id: stageId },
    }),
    prisma.registered_team.findMany({
      select: { teamName: true, id: true },
      where: {
        registrationBatch: {
          competitionCategory: { stages: { some: { id: stageId } } },
        },
        status: "ACCEPTED",
      },
    }),
  ]);

  if (!stageWithTeam) return notFound();

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <H2 className="font-semibold">Team on Stage List</H2>
          <P>Managing the Team at this stage</P>
        </div>
      </div>
      <CategoriesTable teams={teamsOnThisCategory} data={stageWithTeam} />
    </div>
  );
}
