import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from ".";

export const createTeamMemberFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Nama harus diisi!" })
    .max(120, { message: "Nama maximal 120 karakter!" }),
  gradeLevel: z
    .string()
    .min(1, { message: "Tingkat kelas harus diisi!" })
    .max(20, { message: "Tingkat kelas maximal 20 karakter!" })
    .refine(
      (val) => ["VII", "VIII", "IX"].includes(val),
      "Tingkat kelas tidak valid",
    ),
  photo: z
    .any()
    .refine((files: FileList) => files.length !== 0, "Foto harus diisi!")
    .refine((files: FileList) => {
      const file = files[0];
      return file?.size <= MAX_FILE_SIZE;
    }, `Ukuran maksimal file adalah 5MB`)
    .refine((files: FileList) => {
      const file = files[0];
      return ACCEPTED_IMAGE_TYPES.includes(file?.type);
    }, "File harus menggunakan ekstensi .jpg, .jpeg, .png."),
});
