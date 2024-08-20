"use client";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { toast } from "sonner";

import { deleteAnnouncement } from "../actions";

import { Button } from "@/app/_components/global/button";
import { announcementWithStage } from "@/types/relation";
import { useRouter } from "next/navigation";
import Modal from "./modal";

export default function AnnouncementsTable({
  data,
  stages,
}: {
  data: announcementWithStage[];
  stages: { name: string; id: string }[];
}) {
  const [loader, setLoader] = useState(true);
  const [editModalData, setEditModalData] =
    useState<announcementWithStage | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const router = useRouter();

  function editCompetition(data: announcementWithStage) {
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
    if (!confirm("Anda yakin ingin menghapus Kategori ini?")) return;

    const toastId = toast.loading("Loading...");
    const deleteResponse = await deleteAnnouncement(id);

    if (!deleteResponse.success) {
      return toast.error(deleteResponse.message, { id: toastId });
    }

    toast.success(deleteResponse.message, { id: toastId });
    router.refresh();
  }

  const columns: TableColumn<announcementWithStage>[] = [
    {
      name: "Stage",
      selector: (row) => row.stage.name,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: false,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-2">
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
        Add Announcement
      </Button>
      <div className="rounded-md bg-white p-2">
        {isEditModalOpen && (
          <Modal
            stages={stages}
            setIsOpenModal={setIsEditModalOpen}
            data={editModalData}
          />
        )}
        {isCreateModalOpen && (
          <Modal
            stages={stages}
            setIsOpenModal={setIsCreateModalOpen}
            data={null}
          />
        )}

        <DataTable columns={columns} data={data} pagination highlightOnHover />
      </div>
    </>
  );
}
