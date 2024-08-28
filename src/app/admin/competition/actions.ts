"use server";

import { uploadImage } from "@/app/(utils)/global-actions/fileUploader";
import {
  createCompetition,
  findCompetition,
  removeCompetition,
  updateCompetition,
} from "@/database/competition.query";
import { getServerSession } from "@/lib/next-auth";
import { ServerActionResponse } from "@/types/action";
import { fileToBuffer } from "@/utils/utils";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function upsertCompetition(
  id: string | undefined | null,
  actionData: FormData,
): Promise<ServerActionResponse> {
  // Extract the FormData
  const data = {
    name: actionData.get("name") as string | undefined,
    description: actionData.get("description") as string | undefined,
    guidebookUrl: actionData.get("guidebookUrl") as string | undefined,
    logo: actionData.get("logo") as File | undefined,
  };

  try {
    const session = await getServerSession();
    const currentUserRole = session?.user?.role;
    const currentUserId = session?.user?.id;

    if (currentUserRole !== "SUPERADMIN")
      return { success: false, message: "Forbidden" };

    const payload: Prisma.competitionUpdateInput = {
      name: data.name,
      description: data.description,
      logo: undefined,
      guidebookUrl: data.guidebookUrl,
      createdBy: !id ? { connect: { id: currentUserId } } : undefined,
    };

    if (data.logo instanceof File) {
      const logoBuffer = await fileToBuffer(data.logo);
      const uploadedLogo = await uploadImage(logoBuffer);

      payload.logo = uploadedLogo.data?.url;
    }

    if (!id) {
      const { name, description, logo, guidebookUrl } = payload;
      if (!name || !description || !logo || !guidebookUrl) {
        return { success: false, message: "Bad request" };
      }

      await createCompetition(payload as Prisma.competitionCreateInput);

      revalidatePath("/", "layout");
      return { success: true, message: "Sukses membuat competition!" };
    }

    const competitionToUpdate = await findCompetition({ id });
    if (!competitionToUpdate)
      return { success: false, message: "Competition tidak ditemukan!" };

    await updateCompetition({ id }, payload);

    revalidatePath("/", "layout");
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

    revalidatePath("/", "layout");
    return { success: true, message: "Berhasil menghapus competition!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Terjadi kesalahan!" };
  }
}
