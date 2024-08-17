import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email harus diisi!" })
    .email("Email invalid!"),
  password: z.string().min(1, { message: "Password harus diisi!" }),
});
