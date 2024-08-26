"use client";

import Link, { Button } from "@/app/_components/global/button";
import { FileField, TextField } from "@/app/_components/global/input";
import { H1, H3, P } from "@/app/_components/global/text";
import { useZodForm } from "@/app/hooks/useZodForm";
import {
  ACCEPTED_IMAGE_TYPES,
  createRegisteredTeamFormSchema,
} from "@/lib/validator";
import { formatPrice, urlefy } from "@/utils/utils";
import { useContext, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { toast } from "sonner";
import { CompetitionCategoryDetail } from "../../contexts";
import { registerTeam } from "../actions";
import { registration_batch } from "@prisma/client";
import { useRouter } from "next-nprogress-bar";

export default function TeamRegistrationForm({
  registrationBatch,
  paymentCode,
}: {
  registrationBatch: registration_batch;
  paymentCode: number;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const registrationContext = useContext(CompetitionCategoryDetail);
  const { category, competition } = registrationContext!;

  const teamRegistrationForm = useZodForm({
    schema: createRegisteredTeamFormSchema,
  });

  const onSubmit = teamRegistrationForm.handleSubmit(
    async ({
      teamName,
      schoolName,
      phoneNumber,
      supervisingTeacher,
      paymentProof,
    }) => {
      setLoading(true);
      const toastId = toast.loading("Loading...");
      const paymentProofFile = (paymentProof as FileList)[0];

      const actionData = new FormData();
      actionData.append("teamName", teamName);
      actionData.append("schoolName", schoolName);
      actionData.append("phoneNumber", phoneNumber);
      actionData.append("supervisingTeacher", supervisingTeacher);
      actionData.append("paymentProof", paymentProofFile);

      const result = await registerTeam(paymentCode, category.id, actionData);

      if (!result.success) {
        setLoading(false);
        return toast.error(result.message, { id: toastId });
      }

      toast.success(result.message, { id: toastId });
      setLoading(false);
      router.push(
        `/dashboard/${urlefy(competition.name)}/${urlefy(category.name)}`,
      );
    },
  );

  return (
    <form className="w-full max-w-full lg:max-w-[560px]" onSubmit={onSubmit}>
      <Link
        href={`/dashboard/${urlefy(competition.name)}/${urlefy(category.name)}`}
        variant={"tertiary"}
        className="mb-3"
      >
        <FaArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />{" "}
        Kembali ke daftar tim
      </Link>
      <H1 className="mb-3">Registrasi Lomba</H1>
      <P className="mb-5">
        Pendaftaran kompetisi{" "}
        <span className="text-primary-400">{competition.name}</span> pada
        kategori lomba <span className="text-primary-400">{category.name}</span>
        .
      </P>
      <H3 className="mb-3">
        Sekilas tentang bidang {category.name} pada kompetisi {competition.name}
      </H3>
      <P className="mb-[54px]">{category.description}</P>
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
          label="Nomor Telepon (Tanpa 0 atau kode negara)"
          placeholder="89509120132"
          errorMessage={
            teamRegistrationForm.formState.errors.phoneNumber?.message
          }
          {...teamRegistrationForm.register("phoneNumber")}
        />
        <FileField
          name="paymentProof"
          label="Bukti Pembayaran"
          description={`Biaya pendaftaran sebesar <b>${formatPrice(Number(registrationBatch.registrationPrice) + paymentCode, "IDR", "id-ID")}</b> dibayarkan ke <b className="font-bold">1440542591992</b> a.n Moklet Anniversary Panitia.`}
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
        disabled={loading}
      >
        Kirim
      </Button>
    </form>
  );
}
