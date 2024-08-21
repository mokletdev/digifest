"use client";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "sonner";

import { Button } from "@/app/_components/global/button";
import { stageWithTeam } from "@/types/relation";
import { useRouter } from "next/navigation";
import Modal from "./modal";
import { deleteTeamFromStage } from "../actions";

export default function StagesTable({
  data,
  teams,
}: {
  data: stageWithTeam;
  teams: { teamName: string; id: string }[];
}) {
  const [loader, setLoader] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const router = useRouter();

  function createCompetition() {
    setIsCreateModalOpen(true);
  }

  async function deleteAction(id: string) {
    if (!confirm("Anda yakin ingin menghapus Tahap ini?")) return;

    const toastId = toast.loading("Loading...");
    const deleteResponse = await deleteTeamFromStage(id, data.id);

    if (!deleteResponse.success) {
      return toast.error(deleteResponse.message, { id: toastId });
    }

    toast.success(deleteResponse.message, { id: toastId });
    router.refresh();
  }

  const columns: TableColumn<stageWithTeam["teams"][0]>[] = [
    {
      name: "Competition Category",
      selector: () => data.name,
      sortable: true,
    },
    {
      name: "School Origin",
      selector: (row) => row.schoolName,
      sortable: true,
    },
    {
      name: "Team Name",
      selector: (row) => row.teamName,
      sortable: false,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => deleteAction(row.id)}
            title="Delete Team"
            className="me-2 rounded bg-red-100 p-2.5 text-xs font-medium text-red-800 transition-all hover:bg-red-700 hover:text-white"
          >
            <FaRegTrashAlt />
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    setLoader(false);
  }, []);

  if (loader) return <div>Loading</div>;

  return (
    <>
      <Button
        variant={"primary"}
        onClick={() => {
          createCompetition();
        }}
      >
        Add team
      </Button>
      <div className="rounded-md bg-white p-2">
        {isCreateModalOpen && (
          <Modal
            teams={teams}
            setIsOpenModal={setIsCreateModalOpen}
            stageId={data.id}
          />
        )}

        <DataTable
          columns={columns}
          data={data.teams}
          pagination
          highlightOnHover
        />
      </div>
    </>
  );
}
