import { H2, P } from "@/app/_components/global/text";
import prisma from "@/lib/prisma";
import CategoriesTable from "./_components/table";

export default async function Stage() {
  const [stageWithCompetitionCategory, categories] = await prisma.$transaction([
    prisma.stage.findMany({ include: { competitionCategory: true } }),
    prisma.competition_category.findMany({ select: { name: true, id: true } }),
  ]);

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <H2 className="font-semibold">Stage List</H2>
          <P>Create and edit competition stage</P>
        </div>
      </div>
      <CategoriesTable
        competitionCategories={categories.map(({ id, name }) => ({ name, id }))}
        data={stageWithCompetitionCategory}
      />
    </div>
  );
}
