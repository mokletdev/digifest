"use client";
import Link, { Button } from "@/app/_components/global/button";
import { FileField, TextField } from "@/app/_components/global/input";
import { H1, H2, H3, P } from "@/app/_components/global/text";
import { ACCEPTED_IMAGE_TYPES } from "@/lib/validator";
import { BaseSyntheticEvent, useContext, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import {
  RegistrationFormContext,
  RegistrationFormContextValues,
} from "../contexts";
import { Prisma, team_member } from "@prisma/client";

export function TeamDataForm({
  onSubmit,
  teamRegistrationForm,
}: {
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
  teamRegistrationForm: UseFormReturn<{
    teamName: string;
    phoneNumber: string;
    supervisingTeacher: string;
    schoolName: string;
    paymentProof?: any;
  }>;
}) {
  const registrationContext = useContext(RegistrationFormContext);
  const { competition, category } =
    registrationContext as RegistrationFormContextValues;

  return (
    <form className="w-full max-w-full lg:max-w-[460px]" onSubmit={onSubmit}>
      <Link href="/dashboard" variant={"tertiary"} className="mb-3">
        <FaArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />{" "}
        Kembali ke dashboard
      </Link>
      <H1 className="mb-3">Registrasi Lomba</H1>
      <P className="mb-5">
        Pendaftaran kompetisi{" "}
        <span className="text-primary-400">{competition.name}</span> pada
        kategori lomba <span className="text-primary-400">{category.name}</span>
        .
      </P>
      <H3 className="mb-3">
        Sekilas tentang bidang {category.name} di {competition.name}
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

export function TeamMemberForm({
  onSubmit,
  memberForms,
}: {
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
  memberForms: UseFormReturn<{
    name: string;
    gradeLevel: string;
  }>[];
}) {
  const registrationContext = useContext(RegistrationFormContext);
  const { category } = registrationContext as RegistrationFormContextValues;
  const [formStep, setFormStep] = useState(0);
  const [members, setMembers] = useState<
    { name: string; gradeLevel: string; photo: File }[]
  >([]);

  return (
    <form className="w-full max-w-full lg:max-w-[460px]" onSubmit={onSubmit}>
      <Link href="/dashboard" variant={"tertiary"} className="mb-3">
        <FaArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />{" "}
        Kembali ke dashboard
      </Link>
      <H1 className="mb-3">Data Anggota Tim</H1>
      <P className="mb-[54px]">
        Minimal mengisikan {category.minMemberCount} data anggota. Maksimal
        mengisikan {category.maxMemberCount} data anggota. Tekan tombol skip
        jika telah mengisikan semua anggota tim.
      </P>
      <Button
        variant={"primary"}
        type="submit"
        className="w-full justify-center"
      >
        {}Lanjutkan
      </Button>
    </form>
  );
}
