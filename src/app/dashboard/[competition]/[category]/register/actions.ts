"use server";

import { uploadImage } from "@/app/global-actions/fileUploader";
import { createRegistration } from "@/database/registration.query";
import { findActiveRegistrationBatch } from "@/database/utils";
import { getServerSession } from "@/lib/next-auth";
import { ServerActionResponse } from "@/types/action";
import { fileToBuffer } from "@/utils/utils";
import { Prisma } from "@prisma/client";

export async function registerTeam(
  categoryId: string,
  actionData: FormData,
): Promise<ServerActionResponse> {
  // Extract the FormData
  const data = {
    teamName: actionData.get("teamName") as string,
    schoolName: actionData.get("schoolName") as string,
    supervisingTeacher: actionData.get("supervisingTeacher") as string,
    phoneNumber: actionData.get("phoneNumber") as string,
    paymentProof: actionData.get("paymentProof") as File,
  };

  try {
    const session = await getServerSession();
    const activeRegistrationBatch =
      await findActiveRegistrationBatch(categoryId);

    if (!activeRegistrationBatch)
      return {
        success: false,
        message: "Tidak ada batch pendaftaran yang aktif saat ini",
      };

    if (session?.user?.role !== "USER")
      return {
        success: false,
        message: "Hanya USER yang dapat melakukan registrasi tim",
      };

    const payload: Prisma.registered_teamCreateInput = {
      ...data,
      paymentProof: "",
      registeredBy: {
        connect: { id: session.user.id },
      },
      registrationBatch: {
        connect: { id: activeRegistrationBatch.id },
      },
    };

    if (data.paymentProof instanceof File) {
      const paymentProofBuffer = await fileToBuffer(data.paymentProof);
      const uploadedPaymentProof = await uploadImage(paymentProofBuffer);
      if (!uploadedPaymentProof.success)
        return { success: false, message: "Gagal upload bukti pembayaran!" };

      payload.paymentProof = uploadedPaymentProof.data?.url!;
    }

    await createRegistration(payload);
    return { success: true, message: "Berhasil melakukan registrasi!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Terjadi kesalahan di server!" };
  }
}
