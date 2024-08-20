"use server";

import {
  createStage,
  findStage,
  removeStage,
  updateStage,
} from "@/database/stage.query";
import { getServerSession } from "@/lib/next-auth";
import { ServerActionResponse } from "@/types/action";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function upsertStage(
  id: string | undefined | null,
  data: {
    name: string;
    description: string;
    stageNumber: number;
    startDate: Date;
    endDate: Date;
    competitionCategoryId: string;
  },
): Promise<ServerActionResponse> {
  try {
    const session = await getServerSession();
    const currentUserRole = session?.user?.role;

    if (currentUserRole !== "SUPERADMIN" && currentUserRole !== "ADMIN")
      return { success: false, message: "Forbidden" };

    // Extract competitionId
    const { competitionCategoryId, ...payloadData } = data;
    const payload: Prisma.stageCreateInput = {
      ...payloadData,
      competitionCategory: { connect: { id: competitionCategoryId } },
    };

    if (!id) {
      const { name, description, stageNumber, startDate, endDate } = data;

      await createStage({
        name,
        description,
        stageNumber,
        startDate,
        endDate,
        competitionCategory: {
          connect: { id: competitionCategoryId },
        },
      });

      return { success: true, message: "Sukses membuat Stage!" };
    }

    const stageToUpdate = await findStage({ id });
    if (!stageToUpdate)
      return { success: false, message: "Stage tidak ditemukan!" };

    await updateStage({ id }, payload);

    revalidatePath("/admin/stage");
    return { success: true, message: "Sukses meng-update Stage!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal server error" };
  }
}

export async function deleteStage(id: string): Promise<ServerActionResponse> {
  try {
    const session = await getServerSession();
    if (session?.user?.role !== "ADMIN" && session?.user?.role !== "SUPERADMIN")
      return { success: false, message: "Forbidden" };

    const stageToDelete = await findStage({ id });
    if (!stageToDelete)
      return { success: false, message: "Stage tidak ditemukan!" };

    await removeStage({ id });

    revalidatePath("/admin/stage");
    return { success: true, message: "Berhasil menghapus Stage!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Terjadi kesalahan!" };
  }
}
