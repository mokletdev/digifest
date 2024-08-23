"use client";
import { competition } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";
import { FaX } from "react-icons/fa6";

import { Button } from "@/app/_components/global/button";
import { FileField, TextField } from "@/app/_components/global/input";
import { H3 } from "@/app/_components/global/text";
import { useZodForm } from "@/app/hooks/useZodForm";
import {
  ACCEPTED_IMAGE_TYPES,
  createCompetitionFormSchema,
  updateCompetitionFormSchema,
} from "@/lib/validator";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { upsertCompetition } from "../actions";
import ModalWrapper from "@/app/_components/global/modal-wrapper";

export default function Modal({
  setIsOpenModal,
  data,
}: {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>; // Needed for closing the modal
  data?: competition | null;
}) {
  const [loading, setLoading] = useState(false);
  const form = useZodForm({
    defaultValues: {
      name: data?.name,
      description: data?.description,
      logo: undefined,
      guidebookUrl: data?.guidebookUrl,
    },
    schema:
      data === null ? createCompetitionFormSchema : updateCompetitionFormSchema,
  });
  const router = useRouter();

  const onSubmit = form.handleSubmit(async (values) => {
    setLoading(true);
    const logoFile = (values.logo as FileList)[0];
    const toastId = toast.loading("Loading...");

    const actionData = new FormData();
    actionData.append("name", values.name);
    actionData.append("description", values.description);
    actionData.append("guidebookUrl", values.guidebookUrl);
    actionData.append("logo", logoFile);

    const result = await upsertCompetition(data?.id, actionData);

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
          <H3>Competition Data</H3>
          <button
            className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 transition-all hover:bg-gray-200 hover:text-gray-900"
            onClick={() => setIsOpenModal(false)}
            type="button"
          >
            <FaX size={16} />
          </button>
        </div>
        <div className="space-y-4 p-4 md:p-5">
          <TextField
            type="text"
            label="Nama kompetisi"
            placeholder="Olimawisa"
            errorMessage={form.formState.errors.name?.message}
            {...form.register("name")}
          />
          <TextField
            type="text"
            label="Deskripsi"
            placeholder="Olimawisa merupakan sebuah kompetisi..."
            errorMessage={form.formState.errors.description?.message}
            {...form.register("description")}
          />
          <FileField
            name="logo"
            label="Logo"
            register={form.register}
            accept={ACCEPTED_IMAGE_TYPES.reduce(
              (prev, curr) => prev + ", " + curr,
            )}
            errorMessage={form.formState.errors.logo?.message?.toString()}
          />
          <TextField
            type="text"
            label="Guidebook URL"
            placeholder="https://example.com/guidebook.pdf"
            errorMessage={form.formState.errors.guidebookUrl?.message}
            {...form.register("guidebookUrl")}
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
