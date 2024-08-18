"use client";
import { competition } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import { FaX } from "react-icons/fa6";

import { Button } from "@/app/_components/global/button";
import { TextField } from "@/app/_components/global/input";
import { H3 } from "@/app/_components/global/text";
import { useZodForm } from "@/app/hooks/useZodForm";
import { createCompetitionFormSchema } from "@/lib/validator";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { upsertCompetition } from "../actions";

export default function Modal({
  setIsOpenModal,
  data,
}: {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>; // Needed for closing the modal
  data?: competition | null;
}) {
  const form = useZodForm({
    defaultValues: {
      name: data?.name,
      description: data?.description,
      logo: data?.logo,
      guidebookUrl: data?.logo,
    },
    schema: createCompetitionFormSchema,
  });
  const router = useRouter();

  const onSubmit = form.handleSubmit(async (values) => {
    const toastId = toast.loading("Loading...");
    const result = await upsertCompetition(data?.id, values);

    if (result.success) {
      toast.success(result.message, { id: toastId });
      setIsOpenModal(false);
      router.refresh();
    } else toast.error(result.message, { id: toastId });
  });

  return (
    <div className="fixed right-0 top-0 z-10 m-auto h-full w-full items-center justify-center bg-gray-300/50 lg:w-[calc(100%-20rem)]">
      <div className="relative top-20 m-auto h-full max-h-full w-full max-w-2xl p-4">
        <div className="relative rounded-lg bg-white">
          <form onSubmit={onSubmit}>
            <div className="flex items-center justify-between border-b p-4 md:p-5">
              <H3>Competition Data</H3>
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
                placeholder="John Doe"
                errorMessage={form.formState.errors.name?.message}
                {...form.register("name")}
              />
              <TextField
                type="text"
                label="Description"
                placeholder="desc"
                errorMessage={form.formState.errors.description?.message}
                {...form.register("description")}
              />
              <TextField
                type="text"
                label="Logo URL"
                placeholder="https://example.com/logo.png"
                errorMessage={form.formState.errors.logo?.message}
                {...form.register("logo")}
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
              <Button variant={"primary"} type="submit">
                Kirim
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
