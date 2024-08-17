"use client";
import { Role, user } from "@prisma/client";
import { Session } from "next-auth";
import { Dispatch, SetStateAction } from "react";
import { FaX } from "react-icons/fa6";

import { Button } from "@/app/_components/global/button";
import { SelectField, TextField } from "@/app/_components/global/input";
import { H3 } from "@/app/_components/global/text";
import { useZodForm } from "@/app/hooks/useZodForm";
import { createUserFormSchema, updateUserFormSchema } from "@/lib/validator";
import { toast } from "sonner";
import { upsertUser } from "../actions";
import { Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function Modal({
  setIsOpenModal,
  data,
}: {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>; // Needed for closing the modal
  data?: user | null;
}) {
  const form = useZodForm({
    defaultValues: {
      name: data?.name,
      email: data?.email,
      password: "",
      role: data?.role,
    },
    schema: data ? createUserFormSchema : updateUserFormSchema,
  });
  const router = useRouter();

  const onSubmit = form.handleSubmit(async (values) => {
    const toastId = toast.loading("Loading...");
    const result = await upsertUser(data?.id, values);

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
              <H3>User Data</H3>
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
                label="Email"
                placeholder="xx@smktelkom-mlg.sch.id"
                errorMessage={form.formState.errors.email?.message}
                {...form.register("email")}
              />
              <Controller
                name="role"
                control={form.control}
                render={({ field, fieldState }) => {
                  const options = Object.values(Role).map((role) => ({
                    label: role,
                    value: role,
                  }));

                  return (
                    <SelectField
                      label="Select role"
                      name={field.name}
                      handleChange={(selectedOption) => {
                        field.onChange(selectedOption?.value);
                      }}
                      required
                      value={options.find(
                        (option) => option.value === field.value,
                      )}
                      options={options}
                      errorMessage={fieldState.error?.message}
                    />
                  );
                }}
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
