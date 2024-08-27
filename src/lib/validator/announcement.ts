import { z } from "zod";

export const createAnnouncementFormSchema = z.object({
  title: z.string().min(1, { message: "Judul harus diisi!" }),
  content: z.string().min(1, { message: "Konten harus diisi!" }),
  stageId: z
    .string({ message: "Stage harus diisi!" })
    .uuid("Stage ID harus berupa UUID"),
});
