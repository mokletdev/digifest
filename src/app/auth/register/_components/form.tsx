"use client";
import { Button } from "@/app/_components/global/button";
import { TextField } from "@/app/_components/global/input";
import { H2, P } from "@/app/_components/global/text";
import { useZodForm } from "@/app/hooks/useZodForm";
import { registerFormSchema } from "@/lib/validator";
import { signIn } from "next-auth/react";
import { default as NextLink } from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import { registerUser } from "../actions";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);

  const form = useZodForm({ schema: registerFormSchema });
  const router = useRouter();

  const onSubmit = form.handleSubmit(async (values) => {
    setLoading(true);
    const toastId = toast.loading("Loading...");
    const registerUserAction = await registerUser(values);

    if (!registerUserAction.success) {
      setLoading(false);
      return toast.error(registerUserAction.message, { id: toastId });
    }

    toast.success(registerUserAction.message, { id: toastId });
    setLoading(false);
    return router.push(`/auth/verify-warning?email=${values.email}`);
  });

  return (
    <form onSubmit={onSubmit} className="mt-[54px]">
      <div className="mb-[54px] block">
        <H2>Daftar dan Bergabung di Digifest!</H2>
        <P>
          Sudah memiliki akun?{" "}
          <NextLink
            href={"/auth/login"}
            className="text-primary-400 transition-all duration-300 hover:text-primary-200"
          >
            Masuk
          </NextLink>
        </P>
      </div>
      <div className="block w-full">
        <Button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          variant={"quartiary"}
          type="button"
          className="mb-[28px] w-full justify-center"
        >
          <FaGoogle /> Masuk dengan Google
        </Button>
        <div className="relative mb-[28px] w-full">
          <svg
            className="absolute left-0 top-1/2 -translate-y-1/2"
            width="185"
            height="2"
            viewBox="0 0 185 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 1H185" stroke="url(#paint0_linear_1094_9415)" />
            <defs>
              <linearGradient
                id="paint0_linear_1094_9415"
                x1="0"
                y1="1"
                x2="185"
                y2="1"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#8E8E8E" stopOpacity="0" />
                <stop offset="1" stopColor="#8E8E8E" />
              </linearGradient>
            </defs>
          </svg>
          <p className="absolute left-1/2 top-1/2 z-[100] h-[22px] w-[50px] -translate-x-1/2 -translate-y-1/2 text-center text-sm text-neutral-400">
            Atau
          </p>
          <svg
            className="absolute right-0 top-1/2 -translate-y-1/2 rotate-180"
            width="185"
            height="2"
            viewBox="0 0 185 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 1H185" stroke="url(#paint0_linear_1094_9415)" />
            <defs>
              <linearGradient
                id="paint0_linear_1094_9415"
                x1="0"
                y1="1"
                x2="185"
                y2="1"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#8E8E8E" stopOpacity="0" />
                <stop offset="1" stopColor="#8E8E8E" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="mb-[54px] flex flex-col gap-[22px]">
        <TextField
          label="Email"
          placeholder="Masukkan alamat email"
          errorMessage={form.formState.errors.email?.message}
          {...form.register("email")}
        />
        <TextField
          label="Nama"
          placeholder="Masukkan nama"
          errorMessage={form.formState.errors.name?.message}
          {...form.register("name")}
        />
        <TextField
          label="Password"
          type="password"
          placeholder="Masukkan kata sandi"
          errorMessage={form.formState.errors.password?.message}
          {...form.register("password")}
        />
      </div>
      <Button
        variant={"primary"}
        type="submit"
        className="w-full justify-center"
        disabled={loading}
      >
        Daftar
      </Button>
    </form>
  );
}
