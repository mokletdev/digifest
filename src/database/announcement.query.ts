import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function findAnnouncements(filter?: Prisma.announcementWhereInput) {
  const Announcements = await prisma.announcement.findMany({
    where: filter,
    include: { stage: true },
  });
  return Announcements;
}

export async function findAnnouncement(filter: Prisma.announcementWhereUniqueInput) {
  const Announcement = await prisma.announcement.findUnique({
    where: filter,
  });
  return Announcement;
}

export async function createAnnouncement(data: Prisma.announcementCreateInput) {
  const createdAnnouncement = await prisma.announcement.create({ data });
  return createdAnnouncement;
}

export async function updateAnnouncement(
  filter: Prisma.announcementWhereUniqueInput,
  data: Prisma.announcementUpdateInput,
) {
  const updatedAnnouncement = await prisma.announcement.update({
    where: filter,
    data,
  });
  return updatedAnnouncement;
}

export async function removeAnnouncement(filter: Prisma.announcementWhereUniqueInput) {
  const deletedAnnouncement = await prisma.announcement.delete({
    where: filter,
  });
  return deletedAnnouncement;
}
