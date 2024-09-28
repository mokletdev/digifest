import { H2, P } from "@/app/_components/global/text";
import prisma from "@/lib/prisma";
import AnnouncmentsTable from "./_components/table";
import { Prisma } from "@prisma/client";

export default async function Registrations({
  searchParams,
}: Readonly<{
  searchParams?: { [key: string]: string | string[] | undefined };
}>) {
  const categoryId = searchParams?.categoryId;
  const batchId = searchParams?.batchId;

  let registrationFilter: Prisma.registered_teamWhereInput = {
    // Handle categoryId filtering
    ...(Array.isArray(categoryId)
      ? {
          OR: categoryId.map((id) => ({
            registrationBatch: { competitionCategoryId: id },
          })),
        }
      : categoryId && {
          registrationBatch: { competitionCategoryId: categoryId },
        }),

    // Handle batchId filtering
    ...(Array.isArray(batchId)
      ? { OR: batchId.map((id) => ({ registrationBatchId: id })) }
      : batchId && { registrationBatchId: batchId }),
  };

  // const registrationWithTeams = await prisma.registered_team.findMany({
  //   include: {
  //     teamMembers: true,
  //   },
  //   where: registrationFilter,
  // });

  const registrationsWithBatch = await prisma.registered_team.findMany({
    include: {
      registrationBatch: {
        select: {
          batchName: true,
          competitionCategory: { select: { name: true, competition: true } },
        },
      },
      teamMembers: { select: { name: true, gradeLevel: true } },
    },
    where: registrationFilter,
  });

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <H2 className="font-semibold">Pendaftaran</H2>
          <P>Manage Registration Data</P>
        </div>
      </div>
      <AnnouncmentsTable data={registrationsWithBatch} />
    </div>
  );
}
