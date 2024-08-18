"use client";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { toast } from "sonner";

import { deleteCompetition } from "../actions";

import { Button } from "@/app/_components/global/button";
import { competition } from "@prisma/client";
import { useRouter } from "next/navigation";
import Modal from "./modal";

export default function CompetitionTable({ data }: { data: competition[] }) {
  const [loader, setLoader] = useState(true);
  const [editModalData, setEditModalData] = useState<competition | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const router = useRouter();

  const columns: TableColumn<competition>[] = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: false,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: false,
    },
    {
      name: "Logo",
      selector: (row) => row.logo,

      sortable: false,
    },
    {
      name: "Guide Book",
      selector: (row) => row.guidebookUrl,

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

  function editCompetition(data: competition) {
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
    if (!confirm("Anda yakin ingin menghapus Competition ini?")) return;

    const toastId = toast.loading("Loading...");
    const deleteResponse = await deleteCompetition(id);

    if (deleteResponse.success) {
      toast.success(deleteResponse.message, { id: toastId });
      router.refresh();
    } else toast.error(deleteResponse.message, { id: toastId });
  }

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
        Add competition
      </Button>
      <div className="rounded-md bg-white p-2">
        {isEditModalOpen && (
          <Modal setIsOpenModal={setIsEditModalOpen} data={editModalData} />
        )}
        {isCreateModalOpen && (
          <Modal setIsOpenModal={setIsCreateModalOpen} data={null} />
        )}

        <DataTable columns={columns} data={data} pagination highlightOnHover />
      </div>
    </>
  );
}
