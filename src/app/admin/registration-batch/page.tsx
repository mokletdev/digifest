import { H2, P } from "@/app/_components/global/text";
import prisma from "@/lib/prisma";
import RegistrationBatchesTable from "./_components/table";

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

  const [registrationBatchWithCompetitionCategory, categories] =
    await prisma.$transaction([
      prisma.registration_batch.findMany({
        include: {
          competitionCategory: true,
          registrations: { select: { status: true } },
        },
        where: stageFilter,
      }),
      prisma.competition_category.findMany({
        select: { name: true, id: true },
      }),
    ]);

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <H2 className="font-semibold">Gelombang Pendaftaran</H2>
          <P>Create and edit Registration Batch</P>
        </div>
      </div>
      <RegistrationBatchesTable
        competitionCategories={categories.map(({ id, name }) => ({ name, id }))}
        data={registrationBatchWithCompetitionCategory}
      />
    </div>
  );
}
