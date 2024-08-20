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
  data: {
    title: string;
    content: string;
    stageId: string;
  },
  id?: string | null,
): Promise<ServerActionResponse> {
  try {
    const session = await getServerSession();
    const currentUserRole = session?.user?.role;
    const currentUserId = session?.user?.id;

    if (currentUserRole !== "SUPERADMIN" && currentUserRole !== "ADMIN")
      return { success: false, message: "Forbidden" };

    // Extract competitionId
    const { stageId, ...payloadData } = data;
    const payload: Prisma.announcementUpdateInput = {
      ...payloadData,
      stage: { connect: { id: stageId } },
      createdBy: undefined,
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

    const announcementToUpdate = await findAnnouncement({ id });
    if (!announcementToUpdate)
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

    const announcementToDelete = await findAnnouncement({ id });
    if (!announcementToDelete)
      return { success: false, message: "Announcement tidak ditemukan!" };

    await removeAnnouncement({ id });

    revalidatePath("/admin/announcement");
    return { success: true, message: "Berhasil menghapus Announcement!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Terjadi kesalahan!" };
  }
}
