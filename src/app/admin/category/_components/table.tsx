"use client";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { toast } from "sonner";

import { deleteCategory } from "../actions";

import { Button } from "@/app/_components/global/button";
import { competitionCategoryWithCompetition } from "@/types/relation";
import { useRouter } from "next/navigation";
import Modal from "./modal";
import { formatPrice } from "@/utils/utils";

export default function CategoriesTable({
  data,
  competitions,
}: {
  data: competitionCategoryWithCompetition[];
  competitions: { name: string; id: string }[];
}) {
  const [loader, setLoader] = useState(true);
  const [editModalData, setEditModalData] =
    useState<competitionCategoryWithCompetition | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const router = useRouter();

  function editCompetition(data: competitionCategoryWithCompetition) {
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
    const deleteResponse = await deleteCategory(id);

    if (!deleteResponse.success) {
      return toast.error(deleteResponse.message, { id: toastId });
    }

    toast.success(deleteResponse.message, { id: toastId });
    router.refresh();
  }

  const columns: TableColumn<competitionCategoryWithCompetition>[] = [
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
      name: "Payment Code",
      selector: (row) => row.paymentCode,
      sortable: false,
    },
    {
      name: "Price",
      selector: (row) =>
        formatPrice(Number(row.registrationPrice), "IDR", "id-ID"),
      sortable: false,
    },
    {
      name: "Stages Count",
      selector: (row) => row.numberOfStages,
      sortable: false,
    },
    {
      name: "Members Count",
      selector: (row) => `${row.minMemberCount} - ${row.maxMemberCount} orang`,
      sortable: false,
    },
    {
      name: "Competition",
      selector: (row) => row.competition.name,
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
        Add category
      </Button>
      <div className="rounded-md bg-white p-2">
        {isEditModalOpen && (
          <Modal
            competitions={competitions}
            setIsOpenModal={setIsEditModalOpen}
            data={editModalData}
          />
        )}
        {isCreateModalOpen && (
          <Modal
            competitions={competitions}
            setIsOpenModal={setIsCreateModalOpen}
            data={null}
          />
        )}

        <DataTable columns={columns} data={data} pagination highlightOnHover />
      </div>
    </>
  );
}