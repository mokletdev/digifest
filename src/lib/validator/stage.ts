import { z } from "zod";

export const createStageFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Nama harus diisi!" })
    .max(120, { message: "Nama maximal 120 karakter!" }),
  description: z.string().min(1, { message: "Deskripsi harus diisi!" }),
  startDate: z
    .string()
    .min(1, { message: "Tanggal mulai harus diisi" })
    .refine(
      (val) => {
        const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
        return regex.test(val) && !isNaN(new Date(val).getTime());
      },
      {
        message: "Tanggal mulai tidak sesuai format",
      },
    ),
  endDate: z
    .string()
    .min(1, { message: "Tanggal mulai harus diisi" })
    .refine(
      (val) => {
        const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
        return regex.test(val) && !isNaN(new Date(val).getTime());
      },
      {
        message: "Tanggal selesai tidak sesuai format",
      },
    ),
  isCompetitionStage: z.enum(["YES", "NO"]),
  competitionCategoryId: z
    .string({ message: "Kategori Kompetisi harus diisi!" })
    .uuid("Competition ID harus berupa UUID"),
});
