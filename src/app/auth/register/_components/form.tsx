"use client";
import { Button } from "@/app/_components/global/button";
import { TextField } from "@/app/_components/global/input";
import { useZodForm } from "@/app/hooks/useZodForm";
import { registerFormSchema } from "@/lib/validator";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { registerUser } from "../actions";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);

  const form = useZodForm({ schema: registerFormSchema });

  const onSubmit = form.handleSubmit(async (values) => {
    setLoading(true);
    const toastId = toast.loading("Loading...");
    const registerUserAction = await registerUser(values);

    if (!registerUserAction.success) {
      setLoading(false);
      toast.error(registerUserAction.message, { id: toastId });
    }

    toast.success(registerUserAction.message, { id: toastId });
    setLoading(false);
    redirect("/");
  });

  return (
    <form onSubmit={onSubmit}>
      <TextField
        className="mb-2"
        label="Email"
        errorMessage={form.formState.errors.email?.message}
        {...form.register("email")}
      />
      <TextField
        className="mb-2"
        label="Nama"
        type="text"
        errorMessage={form.formState.errors.name?.message}
        {...form.register("name")}
      />
      <TextField
        className="mb-2"
        label="Password"
        type="password"
        errorMessage={form.formState.errors.password?.message}
        {...form.register("password")}
      />
      <Button variant={"primary"} type="submit" disabled={loading}>
        Daftar
      </Button>
    </form>
  );
}
