import { z } from "zod";

export const createCategoryFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Nama harus diisi!" })
    .max(120, { message: "Nama maximal 120 karakter!" }),
  description: z.string().min(1, { message: "Deskripsi harus diisi!" }),
  minMemberCount: z
    .string()
    .min(1, { message: "Jumlah tahap harus diisi!" })
    .refine((val) => Number.isInteger(Number(val)), {
      message: "Jumlah tahap harus berupa bilangan bulat!",
    }),
  maxMemberCount: z
    .string()
    .min(1, { message: "Jumlah tahap harus diisi!" })
    .refine((val) => Number.isInteger(Number(val)), {
      message: "Jumlah tahap harus berupa bilangan bulat!",
    }),
  competitionId: z
    .string({ message: "Kompetisi harus diisi!" })
    .uuid("Competition ID harus berupa UUID"),
});
