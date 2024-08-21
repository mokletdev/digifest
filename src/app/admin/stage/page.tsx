import { H2, P } from "@/app/_components/global/text";
import prisma from "@/lib/prisma";
import CategoriesTable from "./_components/table";

export default async function Stage({
  searchParams,
}: Readonly<{
  searchParams?: { [key: string]: string | string[] | undefined };
}>) {
  const categoryId = searchParams?.categoryId;
  let stageFilter;

  if (typeof categoryId === "object") {
    stageFilter = {
      OR: categoryId.map((id) => ({ competitionCategoryId: id })),
    };
  } else if (typeof categoryId === "string") {
    stageFilter = { competitionCategoryId: categoryId };
  }

  const [stageWithCompetitionCategory, categories] = await prisma.$transaction([
    prisma.stage.findMany({
      include: { competitionCategory: true },
      where: stageFilter,
    }),
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
        competitionCategories={categories}
        data={stageWithCompetitionCategory}
      />
    </div>
  );
}
