"use client";

import Link, { Button } from "@/app/_components/global/button";
import { FileField, TextField } from "@/app/_components/global/input";
import { SelectFieldController } from "@/app/_components/global/input-controller";
import { H1, P } from "@/app/_components/global/text";
import { useZodForm } from "@/app/hooks/useZodForm";
import {
  ACCEPTED_IMAGE_TYPES,
  createTeamMemberFormSchema,
} from "@/lib/validator";
import { urlefy } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { toast } from "sonner";
import { registerMember } from "../actions";
import { RegistrationFormContext } from "../contexts";

export default function MemberRegistrationForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const registrationContext = useContext(RegistrationFormContext);
  const { category, competition, member, registration } = registrationContext!;

  const memberRegistrationForm = useZodForm({
    schema: createTeamMemberFormSchema,
    defaultValues: {
      name: member?.name,
      gradeLevel: member?.gradeLevel,
    },
  });

  const onSubmit = memberRegistrationForm.handleSubmit(
    async ({ name, gradeLevel, photo }) => {
      setLoading(true);
      const toastId = toast.loading("Loading...");
      const photoFile = (photo as FileList)[0];

      const actionData = new FormData();
      actionData.append("name", name);
      actionData.append("gradeLevel", gradeLevel);
      actionData.append("photo", photoFile);

      const result = await registerMember({
        actionData,
        registrationId: registration.id,
        memberId: member?.id,
      });

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
        Kembali ke dashboard kompetisi
      </Link>
      <H1 className="mb-3">
        Tambahkan{" "}
        {registration.teamMembers.length === 0
          ? "Ketua Tim"
          : `Anggota ke-(${registration.teamMembers.length} + 1)`}
      </H1>
      <P className="mb-[54px]">
        {member
          ? `Mengubah data anggota dengan nama ${member.name}`
          : "Pendaftaran anggota baru. Anggota pertama yang didaftarkan akan menjadi ketua tim."}
      </P>
      <div className="mb-[54px] flex w-full flex-col gap-[22px]">
        <TextField
          label="Nama"
          placeholder="Masukkan nama anggota"
          errorMessage={memberRegistrationForm.formState.errors.name?.message}
          {...memberRegistrationForm.register("name")}
        />
        <SelectFieldController
          control={memberRegistrationForm.control}
          label="Tingkatan"
          name="gradeLevel"
          options={["VII", "VIII", "IX"].map((grade) => ({
            label: grade,
            value: grade,
          }))}
        />
        <FileField
          name="photo"
          label="Foto Anggota"
          register={memberRegistrationForm.register}
          accept={ACCEPTED_IMAGE_TYPES.reduce(
            (prev, curr) => prev + ", " + curr,
          )}
          errorMessage={memberRegistrationForm.formState.errors.photo?.message?.toString()}
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
