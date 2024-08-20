"use client";

import { Button } from "@/app/_components/global/button";
import { FileField, TextField } from "@/app/_components/global/input";
import { H1, P } from "@/app/_components/global/text";
import { useZodForm } from "@/app/hooks/useZodForm";
import {
  ACCEPTED_IMAGE_TYPES,
  createRegisteredTeamFormSchema,
} from "@/lib/validator";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function TeamRegistrationForm({
  competitionName,
  categoryName,
}: {
  competitionName: string;
  categoryName: string;
}) {
  const [loading, setLoading] = useState(false);
  const [formStep, setFormStep] = useState(0);

  const teamRegistrationForm = useZodForm({
    schema: createRegisteredTeamFormSchema,
  });
  const router = useRouter();

  const teamRegistrationOnSubmit = teamRegistrationForm.handleSubmit(
    (values) => {
      setFormStep(1);
    },
  );

  return (
    <form
      className="w-full max-w-full lg:max-w-[460px]"
      onSubmit={teamRegistrationOnSubmit}
    >
      <H1 className="mb-3">Registrasi Lomba</H1>
      <P className="mb-[54px]">
        Pendaftaran kompetisi{" "}
        <span className="text-primary-400">{competitionName}</span> pada
        kategori lomba <span className="text-primary-400">{categoryName}</span>.
      </P>
      <div className="mb-[54px] flex w-full flex-col gap-[22px]">
        <TextField
          label="Nama Tim"
          placeholder="Masukkan nama tim"
          errorMessage={teamRegistrationForm.formState.errors.teamName?.message}
          {...teamRegistrationForm.register("teamName")}
        />
        <TextField
          label="Asal Sekolah"
          placeholder="Masukkan asal sekolah"
          errorMessage={
            teamRegistrationForm.formState.errors.schoolName?.message
          }
          {...teamRegistrationForm.register("schoolName")}
        />
        <TextField
          label="Guru Pembimbing"
          placeholder="Pak Guru S.Pd"
          errorMessage={
            teamRegistrationForm.formState.errors.supervisingTeacher?.message
          }
          {...teamRegistrationForm.register("supervisingTeacher")}
        />
        <TextField
          label="Nomor Telepon"
          placeholder="+62-888-8888-8888"
          errorMessage={
            teamRegistrationForm.formState.errors.phoneNumber?.message
          }
          {...teamRegistrationForm.register("phoneNumber")}
        />
        <FileField
          name="paymentProof"
          label="Bukti Pembayaran"
          register={teamRegistrationForm.register}
          accept={ACCEPTED_IMAGE_TYPES.reduce(
            (prev, curr) => prev + ", " + curr,
          )}
          errorMessage={teamRegistrationForm.formState.errors.paymentProof?.message?.toString()}
        />
      </div>
      <Button
        variant={"primary"}
        type="submit"
        className="w-full justify-center"
      >
        Lanjutkan
      </Button>
    </form>
  );
}
