"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { AiOutlineNotification } from "react-icons/ai";

import { Button } from "@/app/_components/global/button";
import { TextField } from "@/app/_components/global/input";
import { SelectFieldController } from "@/app/_components/global/input-controller";
import ModalWrapper from "@/app/_components/global/modal-wrapper";
import { H3 } from "@/app/_components/global/text";
import { useZodForm } from "@/app/hooks/useZodForm";
import { createAnnouncementFormSchema } from "@/lib/validator";
import { announcementWithStage } from "@/types/relation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { upsertAnnouncement } from "../actions";

export default function Modal({
  setIsOpenModal,
  data,
  stages,
}: {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>; // Needed for closing the modal
  data: announcementWithStage | null;
  stages: { id: string; name: string }[];
}) {
  const [loading, setLoading] = useState(false);
  const form = useZodForm({
    defaultValues: {
      title: data?.title,
      content: data?.content,
      stageId: data?.stageId,
    },
    schema: createAnnouncementFormSchema,
  });
  const router = useRouter();

  const onSubmit = form.handleSubmit(async (values) => {
    setLoading(true);
    const toastId = toast.loading("Loading...");
    const result = await upsertAnnouncement(values, data?.id);

    if (!result.success) {
      setLoading(false);
      return toast.error(result.message, { id: toastId });
    }

    toast.success(result.message, { id: toastId });
    setIsOpenModal(false);
    setLoading(false);
    router.refresh();
  });

  return (
    <ModalWrapper>
      <form onSubmit={onSubmit}>
        <div className="flex items-center justify-between border-b p-4 md:p-5">
          <H3>Announcement Data</H3>
          <button
            className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 transition-all hover:bg-gray-200 hover:text-gray-900"
            onClick={() => setIsOpenModal(false)}
          >
            <AiOutlineNotification size={16} />
          </button>
        </div>
        <div className="space-y-4 p-4 md:p-5">
          <TextField
            type="text"
            label="Title"
            placeholder="Judul"
            errorMessage={form.formState.errors.title?.message}
            {...form.register("title")}
          />
          <TextField
            type="text"
            label="Konten"
            placeholder="Halo sobat Mokleters"
            errorMessage={form.formState.errors.content?.message}
            {...form.register("content")}
          />
          <SelectFieldController
            control={form.control}
            label="Stage"
            name="stageId"
            options={stages.map((stage) => ({
              label: stage.name,
              value: stage.id,
            }))}
          />
        </div>
        <div className="flex items-center justify-end rounded-b border-t border-gray-200 p-4 md:p-5">
          <Button variant={"primary"} type="submit" disabled={loading}>
            Kirim
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
}
