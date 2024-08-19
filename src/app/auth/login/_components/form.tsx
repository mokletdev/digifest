"use client";
import { Button } from "@/app/_components/global/button";
import { TextField } from "@/app/_components/global/input";
import { useZodForm } from "@/app/hooks/useZodForm";
import { loginFormSchema } from "@/lib/validator";
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  const form = useZodForm({ schema: loginFormSchema });
  const router = useRouter();

  const onSubmit = form.handleSubmit(async (values) => {
    const toastId = toast.loading("Loading...");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl: "/",
      });

      if (res?.error) {
        setLoading(false);
        return toast.error(
          res.error === "CredentialsSignin"
            ? "Email atau password salah!"
            : "Terjadi kesalahan",
          { id: toastId },
        );
      }
      toast.success("Berhasil login!", { id: toastId });
      router.push("/auth/verify-warning");
    } catch (error) {
      toast.error("Terjadi kesalahan", { id: toastId });
    }
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
        label="Password"
        type="password"
        errorMessage={form.formState.errors.password?.message}
        {...form.register("password")}
      />
      <Button variant={"primary"} type="submit" disabled={loading}>
        Masuk
      </Button>
    </form>
  );
}
