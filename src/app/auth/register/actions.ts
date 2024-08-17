"use server";

import { createUser } from "@/database/user.query";
import { generateHash } from "@/lib/encryption";
import { Prisma } from "@prisma/client";

interface ServerActionResponse {
  success: boolean;
  message: string;
}

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
