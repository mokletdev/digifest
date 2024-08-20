"use server";

import {
  createAnnouncement,
  findAnnouncement,
  removeAnnouncement,
  updateAnnouncement,
} from "@/database/announcement.query";
import {
  findRegistration,
  removeRegistration,
  updateRegistration,
} from "@/database/registration.query";
import { getServerSession } from "@/lib/next-auth";
import { ServerActionResponse } from "@/types/action";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateRegistrationStatus(
  data: {
    status: "PENDING" | "ACCEPTED" | "REJECTED";
  },
  id: string,
): Promise<ServerActionResponse> {
  try {
    const session = await getServerSession();
    const currentUserRole = session?.user?.role;

    if (currentUserRole !== "SUPERADMIN" && currentUserRole !== "ADMIN")
      return { success: false, message: "Forbidden" };

    const registrationToUpdate = await findRegistration({ id });
    if (!registrationToUpdate)
      return { success: false, message: "registration tidak ditemukan!" };

    const payload = { status: data.status };

    await updateRegistration({ id }, payload);

    revalidatePath("/admin/registration");
    revalidatePath("/admin/registration/[id]");
    return { success: true, message: "Sukses meng-update registration!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal server error" };
  }
}

export async function deleteRegistration(
  id: string,
): Promise<ServerActionResponse> {
  try {
    const session = await getServerSession();
    if (session?.user?.role !== "ADMIN" && session?.user?.role !== "SUPERADMIN")
      return { success: false, message: "Forbidden" };

    const registrationToDelete = await findRegistration({ id });
    if (!registrationToDelete)
      return { success: false, message: "Registration tidak ditemukan!" };

    await removeRegistration({ id });

    revalidatePath("/admin/registration");
    return { success: true, message: "Berhasil menghapus Registration!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Terjadi kesalahan!" };
  }
}
