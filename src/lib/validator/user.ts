import { z } from "zod";

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
