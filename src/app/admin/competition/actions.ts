"use server";

import {
  createCompetition,
  findCompetition,
  removeCompetition,
  updateCompetition,
} from "@/database/competition.query";
import { getServerSession } from "@/lib/next-auth";
import { ServerActionResponse } from "@/types/action";
import { revalidatePath } from "next/cache";

export async function upsertCompetition(
  id: string | undefined | null,
  data: {
    name?: string;
    description?: string;
    logo?: string;
    guidebookUrl?: string;
  },
): Promise<ServerActionResponse> {
  try {
    const session = await getServerSession();
    const currentUserRole = session?.user?.role;
    const currentUserId = session?.user?.id;

    if (currentUserRole !== "SUPERADMIN")
      return { success: false, message: "Forbidden" };

    if (!id) {
      const { name, description, logo, guidebookUrl } = data;
      if (!name || !description || !logo || !guidebookUrl)
        return { success: false, message: "Bad request" };

      await createCompetition({
        name,
        description,
        logo,
        guidebookUrl,
        createdBy: {
          connect: {
            id: currentUserId,
          },
        },
      });

      return { success: true, message: "Sukses membuat competition!" };
    }

    const competitionToUpdate = await findCompetition({ id });
    if (!competitionToUpdate)
      return { success: false, message: "Competition tidak ditemukan!" };

    await updateCompetition({ id }, data);

    revalidatePath("/admin/competition");
    return { success: true, message: "Sukses meng-update competition!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal server error" };
  }
}

export async function deleteCompetition(
  id: string,
): Promise<ServerActionResponse> {
  try {
    const session = await getServerSession();
    if (session?.user?.role !== "SUPERADMIN")
      return { success: false, message: "Forbidden" };

    const competitionToDelete = await findCompetition({ id });
    if (!competitionToDelete)
      return { success: false, message: "Competition tidak ditemukan!" };

    await removeCompetition({ id });

    return { success: true, message: "Berhasil menghapus competition!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Terjadi kesalahan!" };
  }
}
