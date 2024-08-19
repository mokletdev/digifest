import { z } from "zod";

export const MAX_FILE_SIZE = 5_000_000;
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email harus diisi!" })
    .email("Email invalid!"),
  password: z.string().min(7, { message: "Password minimal 7 karakter!" }),
});

export const registerFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email harus diisi!" })
    .email("Email invalid!"),
  name: z
    .string()
    .min(1, { message: "Nama harus diisi!" })
    .max(70, { message: "Nama maximal 70 karakter!" }),
  password: z.string().min(7, { message: "Password minimal 7 karakter!" }),
});

export const updateUserFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email minimal 1 karakter!" })
    .email("Email invalid!"),
  name: z
    .string()
    .min(1, { message: "Nama minimal 1 karakter!" })
    .max(70, { message: "Nama maximal 70 karakter!" }),
  role: z.enum(["USER", "ADMIN", "SUPERADMIN"]),
  password: z
    .string()
    .min(7, { message: "Password minimal 7 karakter!" })
    .optional()
    .or(z.literal("")),
});

export const createUserFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email harus diisi!" })
    .email("Email invalid!"),
  name: z
    .string()
    .min(1, { message: "Nama harus diisi!" })
    .max(70, { message: "Nama maximal 70 karakter!" }),
  role: z.enum(["USER", "ADMIN", "SUPERADMIN"]),
  password: z.string().min(7, { message: "Password minimal 7 karakter!" }),
});

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

export const createCategoryFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Nama harus diisi!" })
    .max(120, { message: "Nama maximal 120 karakter!" }),
  description: z.string(),
  paymentCode: z.string().min(1, { message: "Payment Code harus diisi!" }),
  registrationPrice: z
    .string()
    .min(1, { message: "Registration Price harus diisi!" }),
    numberOfStages: z
    .number()
    .min(1, { message: "Number Of Stages Count harus diisi!" }),
  minMemberCount: z
    .number()
    .min(1, { message: "Min Member Count harus diisi!" }),
  maxMemberCount: z
    .number()
    .min(1, { message: "Max Member Count harus diisi!" }),
});

export const updateCategoryFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Nama harus diisi!" })
    .max(120, { message: "Nama maximal 120 karakter!" }),
  description: z.string().min(1, { message: "Deskripsi harus diisi!" }),
  paymentCode: z.string().min(1, { message: "Payment Code harus diisi!" }),
  registrationPrice: z
    .string()
    .min(1, { message: "Registration Price harus diisi!" }),
  numberOfStages: z
    .number()
    .min(1, { message: "Number Of Stages Count harus diisi!" }),
  minMemberCount: z
    .number()
    .min(1, { message: "Min Member Count harus diisi!" }),
  maxMemberCount: z
    .number()
    .min(1, { message: "Max Member Count harus diisi!" }),
});
