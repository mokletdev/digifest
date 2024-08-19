"use client";
import { competition_category } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";
import { FaX } from "react-icons/fa6";

import { Button } from "@/app/_components/global/button";
import { TextField } from "@/app/_components/global/input";
import { H3 } from "@/app/_components/global/text";
import { useZodForm } from "@/app/hooks/useZodForm";
import {
  createCategoryFormSchema,
  updateCategoryFormSchema,
} from "@/lib/validator";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { upsertCategory } from "../actions";
import ModalWrapper from "@/app/_components/global/modal-wrapper";

export default function Modal({
  setIsOpenModal,
  data,
}: {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>; // Needed for closing the modal
  data?: competition_category | null;
}) {
  const [loading, setLoading] = useState(false);
  const form = useZodForm({
    defaultValues: {
      name: data?.name,
      description: data?.description,
      paymentCode: data?.paymentCode,
      registrationPrice: data?.registrationPrice,
      numberOfStages: data?.numberOfStages,
      minMemberCount: data?.minMemberCount,
      maxMemberCount: data?.maxMemberCount,
    },
    schema: data === null ? createCategoryFormSchema : updateCategoryFormSchema,
  });
  const router = useRouter();

  const onSubmit = form.handleSubmit(async (values) => {
    setLoading(true);
    const toastId = toast.loading("Loading...");
    const result = await upsertCategory(data?.id, values);

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
            placeholder="Jane Doe"
            errorMessage={form.formState.errors.name?.message}
            {...form.register("name")}
          />
          <TextField
            type="text"
            label="description"
            placeholder="Description here"
            errorMessage={form.formState.errors.description?.message}
            {...form.register("description")}
          />
          <TextField
            type="text"
            label="paymentCode"
            placeholder="Code here"
            errorMessage={form.formState.errors.paymentCode?.message}
            {...form.register("paymentCode")}
          />
          <TextField
            type="text"
            label="registrationPrice"
            placeholder="Pricehere"
            errorMessage={form.formState.errors.registrationPrice?.message}
            {...form.register("registrationPrice")}
          />
          <TextField
            type="number"
            label="numberOfStages"
            placeholder="Stages here"
            errorMessage={form.formState.errors.numberOfStages?.message}
            {...form.register("numberOfStages")}
          />
          <TextField
            type="number"
            label="minMemberCount"
            placeholder="Min Member here"
            errorMessage={form.formState.errors.minMemberCount?.message}
            {...form.register("minMemberCount")}
          />
          <TextField
            type="number"
            label="maxMemberCount"
            placeholder="Max Member here"
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
