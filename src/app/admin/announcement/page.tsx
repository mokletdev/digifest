import { H2, P } from "@/app/_components/global/text";
import prisma from "@/lib/prisma";
import AnnouncmentsTable from "./_components/table";
import { Prisma } from "@prisma/client";

export default async function Stage({
  searchParams,
}: Readonly<{
  searchParams?: { [key: string]: string | string[] | undefined };
}>) {
  const stageId = searchParams?.stageId;
  let announcementFilter: Prisma.announcementWhereInput | undefined = undefined;

  if (typeof stageId === "object") {
    announcementFilter = {
      OR: stageId.map((id) => ({ stageId: id })),
    };
  } else if (typeof stageId === "string") {
    announcementFilter = { stageId: stageId };
  }

  const [annnouncementWithStages, stages] = await prisma.$transaction([
    prisma.announcement.findMany({
      include: { stage: true },
      where: announcementFilter,
    }),
    prisma.stage.findMany({ select: { name: true, id: true } }),
  ]);

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <H2 className="font-semibold">Announcement List</H2>
          <P>Create and edit Announcment</P>
        </div>
      </div>
      <AnnouncmentsTable
        stages={stages.map(({ id, name }) => ({ name, id }))}
        data={annnouncementWithStages}
      />
    </div>
  );
}
