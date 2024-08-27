import { z } from "zod";

export const createRegistrationBatchFormSchema = z.object({
  batchName: z
    .string()
    .min(1, { message: "Nama Gelombang harus diisi!" })
    .max(120, { message: "Nama Gelombang maximal 120 karakter!" }),
  registrationPrice: z
    .string()
    .min(1, { message: "Harga Pendaftaran harus diisi" }),
  openedDate: z
    .string()
    .min(1, { message: "Tanggal dibuka harus diisi" })
    .refine(
      (val) => {
        const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
        return regex.test(val) && !isNaN(new Date(val).getTime());
      },
      {
        message: "Tanggal dibuka tidak sesuai format",
      },
    ),
  closedDate: z
    .string({ message: "Tanggal ditutup harus diisi!" })
    .min(1, { message: "Tanggal ditutup harus diisi" })
    .refine(
      (val) => {
        const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
        return regex.test(val) && !isNaN(new Date(val).getTime());
      },
      {
        message: "Tanggal ditutup tidak sesuai format",
      },
    ),
  competitionCategoryId: z
    .string({ message: "Kategori Kompetisi harus diisi!" })
    .uuid("Competition ID harus berupa UUID"),
});
