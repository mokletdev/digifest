"use client";

import { SelectField, TextField } from "@/app/_components/global/input";
import { registrationCompleteData } from "@/types/relation";
import { RegistrationStatus } from "@prisma/client";
import { toast } from "sonner";
import { updateRegistrationStatus } from "../actions";
import { H4, P } from "@/app/_components/global/text";
import { convertToDateTimeLocalString } from "@/utils/utils";
import Link from "@/app/_components/global/button";
import { FaArrowRight, FaDownload } from "react-icons/fa";
import { ImageDownloadable } from "@/app/_components/global/image";

export default function DetailRegistration({
  data,
}: {
  data: registrationCompleteData;
}) {
  async function updateAction(status: RegistrationStatus) {
    const toastId = toast.loading("Loading...");
    const updateResponse = await updateRegistrationStatus({ status }, data.id);

    if (!updateResponse.success) {
      return toast.error(updateResponse.message, { id: toastId });
    }

    toast.success(updateResponse.message, { id: toastId });
  }

  return (
    <div className="flex flex-col gap-6">
      <SelectField
        options={Object.keys(RegistrationStatus).map((status) => ({
          label: status,
          value: status,
        }))}
        label="Registration Status"
        handleChange={(e) =>
          updateAction((e?.value || "PENDING") as RegistrationStatus)
        }
        value={{ label: data.status, value: data.status }}
        required
      />

      <div className="flex flex-col gap-2">
        <H4 className="font-semibold">Data Pendaftar</H4>
        <TextField
          type="datetime-local"
          label="Register Date"
          value={convertToDateTimeLocalString(data.createdAt)}
          disabled
        />
        <TextField
          type="text"
          label="Competition Name"
          value={data.registrationBatch.competitionCategory.name}
          disabled
        />
        <TextField
          type="text"
          label="Registration Batch"
          value={data.registrationBatch.batchName}
          disabled
        />
        <TextField
          type="text"
          label="School Origin"
          value={data.schoolName}
          disabled
        />
        <TextField
          type="text"
          label="Team Name"
          value={data.teamName}
          disabled
        />
        <TextField
          type="text"
          label="Number of Member"
          value={data.teamMembers.length}
          disabled
        />
        <TextField
          type="text"
          label="Phone Number"
          value={data.phoneNumber}
          disabled
        />
        <TextField
          type="text"
          label="Superving Teacher"
          value={data.supervisingTeacher}
          disabled
        />
        <TextField
          type="text"
          label="Kode Pembayaran Tim"
          value={data.paymentCode ?? data.newPaymentCode?.paymentCode}
          disabled
        />
        <Link
          href={data.paymentProof}
          variant={"secondary"}
          className="mb-10"
          target="_blank"
        >
          Bukti Pembayaran
          <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />{" "}
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <H4 className="font-semibold">Data Anggota Tim</H4>
        {data.teamMembers.map((member, index) => {
          return (
            <div className="flex flex-col gap-2" key={member.id}>
              <P className="font-semibold">
                {member.isLeader ? "Ketua Tim" : `Anggota Tim`}
              </P>
              <ImageDownloadable
                src={member.photo}
                alt={`${member.name}'s Photo`}
                fileName={member.name}
                width={200}
                height={300}
              />
              <TextField
                type="text"
                label="Nama"
                value={member.name}
                disabled
              />
              <TextField
                type="text"
                label="Grade Level"
                value={member.gradeLevel}
                disabled
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
