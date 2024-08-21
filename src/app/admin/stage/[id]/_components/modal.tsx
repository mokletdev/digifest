"use client";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { FaX } from "react-icons/fa6";

import { Button } from "@/app/_components/global/button";
import { SelectField } from "@/app/_components/global/input";
import ModalWrapper from "@/app/_components/global/modal-wrapper";
import { H3 } from "@/app/_components/global/text";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addTeamToStage } from "../actions";

export default function Modal({
  setIsOpenModal,
  teams,
  stageId,
}: {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>; // Needed for closing the modal
  teams: { id: string; teamName: string }[];
  stageId: string;
}) {
  const [loading, setLoading] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string>();
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedTeam) return toast.error("Please select team");

    setLoading(true);
    const toastId = toast.loading("Loading...");
    const result = await addTeamToStage(selectedTeam, stageId);

    if (!result.success) {
      setLoading(false);
      return toast.error(result.message, { id: toastId });
    }

    toast.success(result.message, { id: toastId });
    setIsOpenModal(false);
    setLoading(false);
    router.refresh();
  };

  return (
    <ModalWrapper>
      <form onSubmit={onSubmit}>
        <div className="flex items-center justify-between border-b p-4 md:p-5">
          <H3>Team on Stage Data</H3>
          <button
            className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 transition-all hover:bg-gray-200 hover:text-gray-900"
            onClick={() => setIsOpenModal(false)}
            type="button"
          >
            <FaX size={16} />
          </button>
        </div>
        <div className="space-y-4 p-4 md:p-5">
          <SelectField
            handleChange={(value) => setSelectedTeam(value?.value)}
            required
            options={teams.map((team) => ({
              label: team.teamName,
              value: team.id,
            }))}
          />
        </div>
        <div className="flex items-center justify-end rounded-b border-t border-gray-200 p-4 md:p-5">
          <Button variant={"primary"} type="submit" disabled={loading}>
            Kirim
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
}
