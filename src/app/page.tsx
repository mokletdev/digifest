"use client";

import { loginFormSchema } from "@/lib/validator";
import { Button } from "./_components/global/button";
import { TextField } from "./_components/global/input";
import { Display } from "./_components/global/text";
import { useZodForm } from "./hooks/useZodForm";

export default function Home() {
  const form = useZodForm({ schema: loginFormSchema });

  const onSubmit = form.handleSubmit((values) => {
    alert(`${values.email} ${values.password}`);
  });

  return (
    <>
      <Display>Test</Display>
      <div className="flex items-center gap-2">
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
          <Button variant={"primary"} type="submit">
            Sign in
          </Button>
        </form>
      </div>
    </>
  );
}
