"use client";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { toast } from "sonner";

import { deleteStage } from "../actions";

import { Button } from "@/app/_components/global/button";
import { stageWithCompetitionCategory } from "@/types/relation";
import Modal from "./modal";
import { stringifyCompleteDate } from "@/utils/utils";
import { HiOutlineSpeakerphone, HiUserGroup } from "react-icons/hi";
import { useRouter } from "next-nprogress-bar";

export default function StagesTable({
  data,
  competitionCategories,
}: {
  data: stageWithCompetitionCategory[];
  competitionCategories: { name: string; id: string }[];
}) {
  const [loader, setLoader] = useState(true);
  const [editModalData, setEditModalData] =
    useState<stageWithCompetitionCategory | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const router = useRouter();

  function editCompetition(data: stageWithCompetitionCategory) {
    setEditModalData(data);
    setIsCreateModalOpen(false);
    setIsEditModalOpen(true);
  }

  function createCompetition() {
    setEditModalData(null);
    setIsEditModalOpen(false);
    setIsCreateModalOpen(true);
  }

  async function deleteAction(id: string) {
    if (!confirm("Anda yakin ingin menghapus Tahap ini?")) return;

    const toastId = toast.loading("Loading...");
    const deleteResponse = await deleteStage(id);

    if (!deleteResponse.success) {
      return toast.error(deleteResponse.message, { id: toastId });
    }

    toast.success(deleteResponse.message, { id: toastId });
    router.refresh();
  }

  const columns: TableColumn<stageWithCompetitionCategory>[] = [
    {
      name: "#",
      selector: (_, i) => i! + 1,
      sortable: false,
    },
    {
      name: "Competition Category",
      selector: (row) => row.competitionCategory.name,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: false,
    },
    {
      name: "Start Date",
      selector: (row) => row.startDate.getTime(),
      cell: (row) => stringifyCompleteDate(row.startDate),
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => row.endDate.getTime(),
      cell: (row) => stringifyCompleteDate(row.endDate),
      sortable: true,
    },
    {
      name: "Action",
      center: true,
      width: "200px",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/admin/stage/${row.id}`)}
            title="Team on Stage"
            className="me-2 rounded bg-blue-100 p-2.5 text-xs font-medium text-blue-800 transition-all hover:bg-blue-700 hover:text-white"
          >
            <HiUserGroup />
          </button>
          <button
            onClick={() => router.push(`/admin/announcement?stageId=${row.id}`)}
            title="Edit Pengumuman"
            className="me-2 rounded bg-blue-100 p-2.5 text-xs font-medium text-blue-800 transition-all hover:bg-blue-700 hover:text-white"
          >
            <HiOutlineSpeakerphone />
          </button>
          <button
            onClick={() => editCompetition(row)}
            title="Edit Competition"
            className="me-2 rounded bg-blue-100 p-2.5 text-xs font-medium text-blue-800 transition-all hover:bg-blue-700 hover:text-white"
          >
            <FaPencilAlt />
          </button>
          <button
            onClick={() => deleteAction(row.id)}
            title="Delete Competition"
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
        Add stage
      </Button>
      <div className="rounded-md bg-white p-2">
        {isEditModalOpen && (
          <Modal
            competitionCategories={competitionCategories}
            setIsOpenModal={setIsEditModalOpen}
            data={editModalData}
          />
        )}
        {isCreateModalOpen && (
          <Modal
            competitionCategories={competitionCategories}
            setIsOpenModal={setIsCreateModalOpen}
            data={null}
          />
        )}

        <DataTable columns={columns} data={data} pagination highlightOnHover />
      </div>
    </>
  );
}
