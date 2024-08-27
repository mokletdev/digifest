"use server";

import { uploadImage } from "@/app/(utils)/global-actions/fileUploader";
import { createMember, updateMember } from "@/database/teamMember.query";
import { getServerSession } from "@/lib/next-auth";
import prisma from "@/lib/prisma";
import { ServerActionResponse } from "@/types/action";
import { fileToBuffer } from "@/utils/utils";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function registerMember({
  actionData,
  registrationId,
  memberId,
}: {
  actionData: FormData;
  registrationId: string;
  memberId?: string;
}): Promise<ServerActionResponse> {
  // Extract the FormData
  const data = {
    name: actionData.get("name") as string,
    gradeLevel: actionData.get("gradeLevel") as string,
    photo: actionData.get("photo") as File,
  };

  try {
    const session = await getServerSession();

    if (session?.user?.role !== "USER")
      return {
        success: false,
        message: "Hanya USER yang dapat melakukan registrasi tim",
      };

    const registration = await prisma.registered_team.findUnique({
      where: { id: registrationId },
      include: {
        teamMembers: true,
        registrationBatch: {
          include: {
            competitionCategory: { select: { maxMemberCount: true } },
          },
        },
      },
    });

    if (!registration)
      return { success: false, message: "registrationId tidak valid!" };

    const payload: Prisma.team_memberUpdateInput = {
      name: data.name,
      gradeLevel: data.gradeLevel,
      photo: undefined,
      isLeader: registration.teamMembers.length === 0,
      team: { connect: { id: registration.id } },
    };

    if (data.photo instanceof File) {
      const logoBuffer = await fileToBuffer(data.photo);
      const uploadedPhoto = await uploadImage(logoBuffer);

      payload.photo = uploadedPhoto.data?.url;
    }

    if (
      !memberId &&
      registration.teamMembers.length >
        registration.registrationBatch.competitionCategory.maxMemberCount
    )
      return { success: false, message: "Tim sudah penuh!" };

    if (memberId) {
      await updateMember({ id: memberId }, payload);

      revalidatePath("/", "layout");
      return { success: true, message: "Berhasil memperbarui data anggota!" };
    }

    await createMember(payload as Prisma.team_memberCreateInput);

    revalidatePath("/", "layout");
    return { success: true, message: "Berhasil mendaftarkan anggota!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Terjadi kesalahan di server!" };
  }
}
