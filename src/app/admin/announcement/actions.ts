"use server";

import {
  createAnnouncement,
  findAnnouncement,
  removeAnnouncement,
  updateAnnouncement,
} from "@/database/announcement.query";
import { getServerSession } from "@/lib/next-auth";
import { ServerActionResponse } from "@/types/action";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function upsertAnnouncement(
  id: string | undefined | null,
  data: {
    title: string;
    content: string;
    stageId: string;
    createdBy: string;
  },
): Promise<ServerActionResponse> {
  try {
    const session = await getServerSession();
    const currentUserRole = session?.user?.role;
    const currentUserId = session?.user?.id;

    if (currentUserRole !== "SUPERADMIN" && currentUserRole !== "ADMIN")
      return { success: false, message: "Forbidden" };

    // Extract competitionId
    const { stageId, createdBy, ...payloadData } = data;
    const payload: Prisma.announcementCreateInput = {
      ...payloadData,
      stage: { connect: { id: stageId } },
      createdBy: { connect: { id: currentUserId } },
    };

    if (!id) {
      const { title, content } = data;

      await createAnnouncement({
        title,
        content,
        stage: {
          connect: { id: stageId },
        },
        createdBy: { connect: { id: currentUserId } },
      });

      return { success: true, message: "Sukses membuat Announcement!" };
    }

    const AnnouncementToUpdate = await findAnnouncement({ id });
    if (!AnnouncementToUpdate)
      return { success: false, message: "Announcement tidak ditemukan!" };

    await updateAnnouncement({ id }, payload);

    revalidatePath("/admin/Announcement");
    return { success: true, message: "Sukses meng-update Announcement!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal server error" };
  }
}

export async function deleteAnnouncement(
  id: string,
): Promise<ServerActionResponse> {
  try {
    const session = await getServerSession();
    if (session?.user?.role !== "ADMIN" && session?.user?.role !== "SUPERADMIN")
      return { success: false, message: "Forbidden" };

    const AnnouncementToDelete = await findAnnouncement({ id });
    if (!AnnouncementToDelete)
      return { success: false, message: "Announcement tidak ditemukan!" };

    await removeAnnouncement({ id });

    revalidatePath("/admin/announcement");
    return { success: true, message: "Berhasil menghapus Announcement!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Terjadi kesalahan!" };
  }
}
