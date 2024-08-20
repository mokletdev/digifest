import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from ".";

export const createCompetitionFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Nama harus diisi!" })
    .max(120, { message: "Nama maximal 120 karakter!" }),
  description: z.string(),
  logo: z
    .any()
    .refine((files: FileList) => {
      const file = files[0];
      return file?.size <= MAX_FILE_SIZE;
    }, `Ukuran maksimal file adalah 5MB`)
    .refine((files: FileList) => {
      const file = files[0];
      return ACCEPTED_IMAGE_TYPES.includes(file?.type);
    }, "File harus menggunakan ekstensi .jpg, .jpeg, .png."),
  guidebookUrl: z.string().url("Guidebook URL harus berupa URL"),
});

export const updateCompetitionFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Nama harus diisi!" })
    .max(120, { message: "Nama maximal 120 karakter!" }),
  description: z.string().min(1, { message: "Deskripsi harus diisi!" }),
  logo: z
    .any()
    .refine((files: FileList) => {
      const file = files[0];
      return file?.size <= MAX_FILE_SIZE || !file;
    }, `Ukuran maksimal file adalah 5MB`)
    .refine((files: FileList) => {
      const file = files[0];
      return ACCEPTED_IMAGE_TYPES.includes(file?.type) || !file;
    }, "File harus menggunakan ekstensi .jpg, .jpeg, .png."),
  guidebookUrl: z.string().url("Guidebook URL harus berupa URL"),
});
