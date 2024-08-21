import { z } from "zod";

export const createTeamMemberFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Nama harus diisi!" })
    .max(120, { message: "Nama maximal 120 karakter!" }),
  gradeLevel: z
    .string()
    .min(1, { message: "Tingkat Kelas harus diisi!" })
    .max(20, { message: "Tingkat Kelas maximal 20 karakter!" }),
});
