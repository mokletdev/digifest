"use server";

import { findUser } from "@/database/user.query";
import { ServerActionResponse } from "@/types/action";

export async function checkVerifiedStatus(
  email: string,
): Promise<ServerActionResponse> {
  try {
    const user = await findUser({ email: email });

    if (!user?.verified)
      return {
        success: false,
        message: "Mohon verifikasi email terlebih dahulu!",
      };

    return { success: true, message: "Email sudah diverifikasi" };
  } catch (error) {
    return { success: false, message: "Terjadi kesalahan!" };
  }
}
