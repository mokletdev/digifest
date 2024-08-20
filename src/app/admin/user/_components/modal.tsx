"use client";
import { Role, user } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";
import { FaX } from "react-icons/fa6";

import { Button } from "@/app/_components/global/button";
import { TextField } from "@/app/_components/global/input";
import { H3 } from "@/app/_components/global/text";
import { useZodForm } from "@/app/hooks/useZodForm";
import { createUserFormSchema, updateUserFormSchema } from "@/lib/validator";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { upsertUser } from "../actions";
import { SelectFieldController } from "@/app/_components/global/input-controller";
import ModalWrapper from "@/app/_components/global/modal-wrapper";

export default function Modal({
  setIsOpenModal,
  data,
}: {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>; // Needed for closing the modal
  data?: user | null;
}) {
  const [loading, setLoading] = useState(false);
  const form = useZodForm({
    defaultValues: {
      name: data?.name,
      email: data?.email,
      password: "",
      role: data?.role,
    },
    schema: data === null ? createUserFormSchema : updateUserFormSchema,
  });
  const router = useRouter();

  const onSubmit = form.handleSubmit(async (values) => {
    setLoading(true);
    const toastId = toast.loading("Loading...");
    const result = await upsertUser(data?.id, values);

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
          <H3>User Data</H3>
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
            placeholder="John Doe"
            errorMessage={form.formState.errors.name?.message}
            {...form.register("name")}
          />
          <TextField
            type="text"
            label="Email"
            placeholder="xx@smktelkom-mlg.sch.id"
            errorMessage={form.formState.errors.email?.message}
            {...form.register("email")}
          />
          <SelectFieldController
            name="role"
            control={form.control}
            label="Select role"
            options={Object.values(Role).map((role) => ({
              label: role,
              value: role,
            }))}
          />
          <TextField
            type="password"
            label="Password"
            placeholder="**********"
            errorMessage={form.formState.errors.password?.message}
            {...form.register("password")}
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
