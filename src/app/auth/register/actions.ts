"use server";

import { createUser } from "@/database/user.query";
import { generateHash } from "@/lib/encryption";
import { ServerActionResponse } from "@/types/action";
import { Prisma } from "@prisma/client";

export async function registerUser(
  data: Prisma.userCreateInput,
): Promise<ServerActionResponse> {
  try {
    const { name, email, password } = data;
    await createUser({
      name,
      email,
      password: generateHash(password as string),
    });

    return {
      success: true,
      message: "Berhasil mendaftarkan user!",
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Gagal mendaftarkan user!" };
  }
}
