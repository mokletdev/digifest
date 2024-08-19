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
  description: z.string().min(1, { message: "Deskripsi harus diisi!" }),
  paymentCode: z.string().min(1, { message: "Kode pembayaran harus diisi!" }),
  registrationPrice: z
    .string()
    .min(1, { message: "Registration Price harus diisi!" }),
  numberOfStages: z
    .string()
    .min(1, { message: "Jumlah tahap harus diisi!" })
    .refine((val) => Number.isInteger(Number(val)), {
      message: "Jumlah tahap harus berupa bilangan bulat!",
    }),
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

export const createStageFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Nama harus diisi!" })
    .max(120, { message: "Nama maximal 120 karakter!" }),
  description: z.string().min(1, { message: "Deskripsi harus diisi!" }),
  stageNumber: z
    .string()
    .min(1, { message: "Urutan tahap harus diisi!" })
    .refine((val) => Number.isInteger(Number(val)), {
      message: "Jumlah tahap harus berupa bilangan bulat!",
    }),
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
    .string({ message: "Tanggal selesai harus diisi!" })
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
  competitionCategoryId: z
    .string({ message: "Kategori Kompetisi harus diisi!" })
    .uuid("Competition ID harus berupa UUID"),
});
