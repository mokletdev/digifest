"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { FaX } from "react-icons/fa6";

import { Button } from "@/app/_components/global/button";
import { TextField } from "@/app/_components/global/input";
import { SelectFieldController } from "@/app/_components/global/input-controller";
import ModalWrapper from "@/app/_components/global/modal-wrapper";
import { H3 } from "@/app/_components/global/text";
import { useZodForm } from "@/app/hooks/useZodForm";
import { createStageFormSchema } from "@/lib/validator";
import { stageWithCompetitionCategory } from "@/types/relation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { upsertStage } from "../actions";
import { convertToDateTimeLocalString } from "@/utils/utils";

export default function Modal({
  setIsOpenModal,
  data,
  competitionCategories,
}: {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>; // Needed for closing the modal
  data?: stageWithCompetitionCategory | null;
  competitionCategories: { id: string; name: string }[];
}) {
  const [loading, setLoading] = useState(false);
  const form = useZodForm({
    defaultValues: {
      name: data?.name,
      description: data?.description,
      startDate:
        data?.startDate && convertToDateTimeLocalString(data?.startDate),
      endDate: data?.endDate && convertToDateTimeLocalString(data?.endDate),
      stageNumber: data?.stageNumber.toString(),
      competitionCategoryId: data?.competitionCategoryId,
    },
    schema: createStageFormSchema,
  });
  const router = useRouter();

  const onSubmit = form.handleSubmit(async (values) => {
    setLoading(true);
    const toastId = toast.loading("Loading...");
    const result = await upsertStage(data?.id, {
      ...values,
      startDate: new Date(values.startDate),
      endDate: new Date(values.endDate),
      stageNumber: Number(values.stageNumber),
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
          <H3>Category Data</H3>
          <button
            className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 transition-all hover:bg-gray-200 hover:text-gray-900"
            onClick={() => setIsOpenModal(false)}
          >
            <FaX size={16} />
          </button>
        </div>
        <div className="space-y-4 p-4 md:p-5">
          <TextField
            type="text"
            label="Name"
            placeholder="Tahap Penyisihan"
            errorMessage={form.formState.errors.name?.message}
            {...form.register("name")}
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
            type="text"
            label="Description"
            placeholder="Turnamen online bidang lomba robotik"
            errorMessage={form.formState.errors.description?.message}
            {...form.register("description")}
          />
          <TextField
            type="number"
            label="Nomor urut tahap"
            placeholder="1"
            errorMessage={form.formState.errors.stageNumber?.message}
            {...form.register("stageNumber")}
          />
          <TextField
            type="datetime-local"
            label="Tanggal mulai"
            errorMessage={form.formState.errors.startDate?.message}
            {...form.register("startDate")}
          />
          <TextField
            type="datetime-local"
            label="Tanggal selesai"
            errorMessage={form.formState.errors.endDate?.message}
            {...form.register("endDate")}
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
