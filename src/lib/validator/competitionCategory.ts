import { z } from "zod";

export const createCategoryFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Nama harus diisi!" })
    .max(120, { message: "Nama maximal 120 karakter!" }),
  description: z.string().min(1, { message: "Deskripsi harus diisi!" }),
  minMemberCount: z
    .string()
    .min(1, { message: "Minimal member harus diisi!" })
    .refine((val) => Number.isInteger(Number(val)), {
      message: "Jumlah minimal member harus berupa bilangan bulat!",
    }),
  maxMemberCount: z
    .string()
    .min(1, { message: "Maksimal member harus diisi!" })
    .refine((val) => Number.isInteger(Number(val)), {
      message: "Jumlah maksimal member harus berupa bilangan bulat!",
    }),
  whatsappGroupLink: z
    .string()
    .url("Whatsapp Group harus berupa Link!")
    .optional()
    .or(z.literal("")),
  competitionId: z
    .string({ message: "Kompetisi harus diisi!" })
    .uuid("Competition ID harus berupa UUID"),
});
