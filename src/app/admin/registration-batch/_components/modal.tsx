"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { FaX } from "react-icons/fa6";

import { Button } from "@/app/_components/global/button";
import { TextField } from "@/app/_components/global/input";
import { SelectFieldController } from "@/app/_components/global/input-controller";
import ModalWrapper from "@/app/_components/global/modal-wrapper";
import { H3 } from "@/app/_components/global/text";
import { useZodForm } from "@/app/hooks/useZodForm";
import { createRegistrationBatchFormSchema } from "@/lib/validator";
import { registrationBatchWithCompetitionCategoryAndRegistrants } from "@/types/relation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { convertToDateTimeLocalString } from "@/utils/utils";
import { upsertRegistrationBatch } from "../actions";
import { useSearchParams } from "next/navigation";

export default function Modal({
  setIsOpenModal,
  data,
  competitionCategories,
}: {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>; // Needed for closing the modal
  data?: registrationBatchWithCompetitionCategoryAndRegistrants | null;
  competitionCategories: { id: string; name: string }[];
}) {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const form = useZodForm({
    defaultValues: {
      batchName: data?.batchName,
      closedDate:
        data?.closedDate && convertToDateTimeLocalString(data?.closedDate),
      openedDate:
        data?.openedDate && convertToDateTimeLocalString(data?.openedDate),
      registrationPrice: data?.registrationPrice.toString(),
      competitionCategoryId:
        data?.competitionCategoryId || searchParams.get("categoryId") || "",
    },
    schema: createRegistrationBatchFormSchema,
  });
  const router = useRouter();

  const onSubmit = form.handleSubmit(async (values) => {
    setLoading(true);
    const toastId = toast.loading("Loading...");
    const result = await upsertRegistrationBatch(data?.id, {
      ...values,
      openedDate: new Date(values.openedDate),
      closedDate: new Date(values.closedDate),
      registrationPrice: Number(values.registrationPrice),
    });

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
          <H3>Registration Batch Data</H3>
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
            label="Name Gelombang"
            placeholder="Gelombang I"
            errorMessage={form.formState.errors.batchName?.message}
            {...form.register("batchName")}
          />
          <SelectFieldController
            control={form.control}
            label="Kompetisi"
            name="competitionCategoryId"
            options={competitionCategories.map((competition) => ({
              label: competition.name,
              value: competition.id,
            }))}
          />
          <TextField
            type="number"
            label="Harga Pendaftaran"
            placeholder="100000"
            errorMessage={form.formState.errors.registrationPrice?.message}
            {...form.register("registrationPrice")}
          />
          <TextField
            type="datetime-local"
            label="Tanggal buka"
            errorMessage={form.formState.errors.openedDate?.message}
            {...form.register("openedDate")}
          />
          <TextField
            type="datetime-local"
            label="Tanggal tutup"
            errorMessage={form.formState.errors.closedDate?.message}
            {...form.register("closedDate")}
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
