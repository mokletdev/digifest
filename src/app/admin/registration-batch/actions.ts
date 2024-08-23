"use server";

import {
  createRegistrationBatch,
  findRegistrationBatch,
  findRegistrationBatches,
  removeRegistrationBatch,
  updateRegistrationBatch,
} from "@/database/registrationBatch.query";
import { getServerSession } from "@/lib/next-auth";
import { ServerActionResponse } from "@/types/action";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function upsertRegistrationBatch(
  id: string | undefined | null,
  data: {
    batchName: string;
    closedDate: Date;
    openedDate: Date;
    registrationPrice: number;
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

    const stageOnDate = await prisma.registration_batch.findFirst({
      where: {
        AND: [
          {
            openedDate: {
              lte: data.openedDate,
            },
          },
          {
            closedDate: {
              gte: data.closedDate,
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
        message: "Sudah ada pendaftaran yang aktif pada tgl tersebut!",
      };

    const payload: Prisma.registration_batchCreateInput = {
      ...payloadData,
      competitionCategory: { connect: { id: competitionCategoryId } },
    };

    if (!id) {
      const {
        batchName,
        closedDate,
        openedDate,
        registrationPrice,
        competitionCategoryId,
      } = data;

      await createRegistrationBatch({
        batchName,
        closedDate,
        openedDate,
        registrationPrice,
        competitionCategory: {
          connect: { id: competitionCategoryId },
        },
      });

      return { success: true, message: "Sukses membuat Gelombang Registrasi!" };
    }

    const stageToUpdate = await findRegistrationBatch({ id });
    if (!stageToUpdate)
      return {
        success: false,
        message: "Gelombang Registrasi tidak ditemukan!",
      };

    await updateRegistrationBatch({ id }, payload);

    revalidatePath("/admin", "layout");
    revalidatePath("/dashboard", "layout");
    revalidatePath("/");
    return {
      success: true,
      message: "Sukses meng-update Gelombang Registrasi!",
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal server error" };
  }
}

export async function deleteRegistrationBatch(
  id: string,
): Promise<ServerActionResponse> {
  try {
    const session = await getServerSession();
    if (session?.user?.role !== "ADMIN" && session?.user?.role !== "SUPERADMIN")
      return { success: false, message: "Forbidden" };

    const stageToDelete = await findRegistrationBatches({ id });
    if (!stageToDelete)
      return { success: false, message: "Stage tidak ditemukan!" };

    await removeRegistrationBatch({ id });

    revalidatePath("/admin", "layout");
    revalidatePath("/dashboard", "layout");
    revalidatePath("/");
    return { success: true, message: "Berhasil menghapus Stage!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Terjadi kesalahan!" };
  }
}
