"use server";

import { getServerSession } from "@/lib/next-auth";
import { ServerActionResponse } from "@/types/action";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function addTeamToStage(
  teamId: string,
  stageId: string,
): Promise<ServerActionResponse> {
  try {
    const session = await getServerSession();
    if (session?.user?.role !== "ADMIN" && session?.user?.role !== "SUPERADMIN")
      return { success: false, message: "Forbidden" };

    await prisma.stage.update({
      where: { id: stageId },
      data: { teams: { connect: { id: teamId } } },
    });

    revalidatePath("/admin/stage");
    revalidatePath("/admin/stage/[id]");
    return { success: true, message: "Berhasil menambahkan team!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Terjadi kesalahan!" };
  }
}

export async function deleteTeamFromStage(
  teamId: string,
  stageId: string,
): Promise<ServerActionResponse> {
  try {
    const session = await getServerSession();
    if (session?.user?.role !== "ADMIN" && session?.user?.role !== "SUPERADMIN")
      return { success: false, message: "Forbidden" };

    await prisma.stage.update({
      where: { id: stageId },
      data: { teams: { disconnect: { id: teamId } } },
    });

    revalidatePath("/admin/stage");
    revalidatePath("/admin/stage/[id]");
    return { success: true, message: "Berhasil menghapus Stage!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Terjadi kesalahan!" };
  }
}
