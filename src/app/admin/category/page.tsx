import { H2, P } from "@/app/_components/global/text";
import prisma from "@/lib/prisma";
import CategoriesTable from "./_components/table";

export default async function Category() {
  const [competitionCategoriesWithCompetition, competitions] =
    await prisma.$transaction([
      prisma.competition_category.findMany({
        include: { competition: true, _count: { select: { stages: true } } },
      }),
      prisma.competition.findMany({ select: { name: true, id: true } }),
    ]);

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <H2 className="font-semibold">Category List</H2>
          <P>Create and edit competition categories</P>
        </div>
      </div>
      <CategoriesTable
        competitions={competitions.map(({ id, name }) => ({ name, id }))}
        data={competitionCategoriesWithCompetition}
      />
    </div>
  );
}
