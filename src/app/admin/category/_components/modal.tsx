"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { FaX } from "react-icons/fa6";

import { Button } from "@/app/_components/global/button";
import { TextField } from "@/app/_components/global/input";
import { SelectFieldController } from "@/app/_components/global/input-controller";
import ModalWrapper from "@/app/_components/global/modal-wrapper";
import { H3 } from "@/app/_components/global/text";
import { useZodForm } from "@/app/hooks/useZodForm";
import { createCategoryFormSchema } from "@/lib/validator";
import { competitionCategoryWithCompetition } from "@/types/relation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { upsertCategory } from "../actions";

export default function Modal({
  setIsOpenModal,
  data,
  competitions,
}: {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>; // Needed for closing the modal
  data?: competitionCategoryWithCompetition | null;
  competitions: { id: string; name: string }[];
}) {
  const [loading, setLoading] = useState(false);
  const form = useZodForm({
    defaultValues: {
      name: data?.name,
      description: data?.description,
      paymentCode: data?.paymentCode,
      minMemberCount: data?.minMemberCount.toString(),
      maxMemberCount: data?.maxMemberCount.toString(),
      competitionId: data?.competitionId,
    },
    schema: createCategoryFormSchema,
  });
  const router = useRouter();

  const onSubmit = form.handleSubmit(async (values) => {
    setLoading(true);
    const toastId = toast.loading("Loading...");
    const result = await upsertCategory(data?.id, {
      ...values,
      maxMemberCount: Number(values.maxMemberCount),
      minMemberCount: Number(values.minMemberCount),
      paymentCode: values.paymentCode,
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
            type="button"
          >
            <FaX size={16} />
          </button>
        </div>
        <div className="space-y-4 p-4 md:p-5">
          <TextField
            type="text"
            label="Name"
            placeholder="Robotic"
            errorMessage={form.formState.errors.name?.message}
            {...form.register("name")}
          />
          <SelectFieldController
            control={form.control}
            label="Kompetisi"
            name="competitionId"
            options={competitions.map((competition) => ({
              label: competition.name,
              value: competition.id,
            }))}
          />
          <TextField
            type="text"
            label="Description"
            placeholder="Bidang robotic pada kompetisi olimawisa..."
            errorMessage={form.formState.errors.description?.message}
            {...form.register("description")}
          />
          <TextField
            type="text"
            label="Kode pembayaran"
            placeholder="1"
            errorMessage={form.formState.errors.paymentCode?.message}
            {...form.register("paymentCode")}
          />
          <TextField
            type="number"
            label="Jumlah minimal member"
            placeholder="1"
            errorMessage={form.formState.errors.minMemberCount?.message}
            {...form.register("minMemberCount")}
          />
          <TextField
            type="number"
            label="Jumlah maksimal member"
            placeholder="4"
            errorMessage={form.formState.errors.maxMemberCount?.message}
            {...form.register("maxMemberCount")}
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
