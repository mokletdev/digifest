"use server";

import {
  createCategory,
  findCategory,
  removeCategory,
  updateCategory,
} from "@/database/category.query";
import { getServerSession } from "@/lib/next-auth";
import { ServerActionResponse } from "@/types/action";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function upsertCategory(
  id: string | undefined | null,
  data: {
    name: string;
    description: string;
    paymentCode: string;
    registrationPrice: string;
    numberOfStages: number;
    minMemberCount: number;
    maxMemberCount: number;
    competitionId: string;
  },
): Promise<ServerActionResponse> {
  try {
    const session = await getServerSession();
    const currentUserRole = session?.user?.role;

    if (currentUserRole !== "SUPERADMIN")
      return { success: false, message: "Forbidden" };

    // Extract competitionId
    const { competitionId, ...payloadData } = data;
    const payload: Prisma.competition_categoryCreateInput = {
      ...payloadData,
      competition: { connect: { id: competitionId } },
    };

    if (!id) {
      const {
        name,
        description,
        paymentCode,
        registrationPrice,
        numberOfStages,
        minMemberCount,
        maxMemberCount,
        competitionId,
      } = data;
      if (
        !name ||
        !description ||
        !paymentCode ||
        !registrationPrice ||
        !numberOfStages ||
        !minMemberCount ||
        !maxMemberCount ||
        !competitionId
      )
        return { success: false, message: "Bad request" };

      await createCategory({
        name,
        description,
        paymentCode,
        registrationPrice,
        numberOfStages,
        minMemberCount,
        maxMemberCount,
        competition: {
          connect: { id: competitionId },
        },
      });

      return { success: true, message: "Sukses membuat Category!" };
    }

    const categoryToUpdate = await findCategory({ id });
    if (!categoryToUpdate)
      return { success: false, message: "Category tidak ditemukan!" };

    await updateCategory({ id }, payload);

    revalidatePath("/admin/category");
    return { success: true, message: "Sukses meng-update Category!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal server error" };
  }
}

export async function deleteCategory(
  id: string,
): Promise<ServerActionResponse> {
  try {
    const session = await getServerSession();
    if (session?.user?.role !== "SUPERADMIN")
      return { success: false, message: "Forbidden" };

    const categoryToDelete = await findCategory({ id });
    if (!categoryToDelete)
      return { success: false, message: "Category tidak ditemukan!" };

    await removeCategory({ id });

    return { success: true, message: "Berhasil menghapus Category!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Terjadi kesalahan!" };
  }
}
