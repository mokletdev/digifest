import { H2, P } from "@/app/_components/global/text";
import prisma from "@/lib/prisma";
import AnnouncmentsTable from "./_components/table";

export default async function Stage() {
  const [annnouncementWithStages, stages] = await prisma.$transaction([
    prisma.announcement.findMany({ include: { stage: true } }),
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
