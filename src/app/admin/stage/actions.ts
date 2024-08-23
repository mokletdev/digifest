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
import prisma from "@/lib/prisma";

export async function upsertStage(
  id: string | undefined | null,
  data: {
    name: string;
    description: string;
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

    if (data.endDate < data.startDate)
      return {
        success: false,
        message: "Tanggal selesai tidak bisa lebih kecil dari tanggal mulai",
      };

    const stageOnDate = await prisma.stage.findFirst({
      where: {
        AND: [
          {
            startDate: {
              lte: data.endDate,
            },
          },
          {
            endDate: {
              gte: data.startDate,
            },
          },
          { competitionCategoryId },
          id ? { NOT: { id } } : {},
        ],
      },
    });

    if (stageOnDate)
      return {
        success: false,
        message: "Sudah ada stage pada tanggal tersebut!",
      };

    const payload: Prisma.stageCreateInput = {
      ...payloadData,
      competitionCategory: { connect: { id: competitionCategoryId } },
    };

    if (!id) {
      const { name, description, startDate, endDate } = data;

      await createStage({
        name,
        description,
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

    revalidatePath("/admin", "layout");
    revalidatePath("/dashboard", "layout");
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

    revalidatePath("/admin", "layout");
    revalidatePath("/dashboard", "layout");
    return { success: true, message: "Berhasil menghapus Stage!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Terjadi kesalahan!" };
  }
}
