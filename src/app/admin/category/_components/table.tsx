"use client";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { FaPencilAlt, FaRegTrashAlt, FaTable, FaWpforms } from "react-icons/fa";
import { toast } from "sonner";

import { deleteCategory } from "../actions";

import { Button } from "@/app/_components/global/button";
import { competitionCategoryWithCompetitionAndCount } from "@/types/relation";
import Modal from "./modal";
import { MdLeaderboard } from "react-icons/md";
import { useRouter } from "next-nprogress-bar";
import { Role } from "@prisma/client";

export default function CategoriesTable({
  data,
  competitions,
  role,
}: {
  data: competitionCategoryWithCompetitionAndCount[];
  competitions: { name: string; id: string }[];
  role: Role;
}) {
  const [loader, setLoader] = useState(true);
  const [editModalData, setEditModalData] =
    useState<competitionCategoryWithCompetitionAndCount | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const router = useRouter();

  function editCompetition(data: competitionCategoryWithCompetitionAndCount) {
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

  const columns: TableColumn<competitionCategoryWithCompetitionAndCount>[] = [
    {
      name: "#",
      selector: (_, i) => i! + 1,
      sortable: false,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: false,
    },
    {
      name: "Stages Count",
      selector: (row) => row._count.stages,
      sortable: false,
    },
    {
      name: "Regist Batch Count",
      selector: (row) => row._count.registrationBatches,
      sortable: false,
    },
    {
      name: "Registrants",
      selector: (row) =>
        row.registrationBatches
          .map((batch) => batch._count.registrations)
          .reduce((prev, curr) => prev + curr, 0),
      sortable: true,
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
      center: true,
      width: "300px",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() =>
              router.push(`/admin/registration?categoryId=${row.id}`)
            }
            title="Registrants Data"
            className="me-2 rounded bg-blue-100 p-2.5 text-xs font-medium text-blue-800 transition-all hover:bg-blue-700 hover:text-white"
          >
            <FaTable />
          </button>
          <button
            onClick={() =>
              router.push(`/admin/registration-batch?categoryId=${row.id}`)
            }
            title="Gelombang Pendaftaran"
            className="me-2 rounded bg-blue-100 p-2.5 text-xs font-medium text-blue-800 transition-all hover:bg-blue-700 hover:text-white"
          >
            <FaWpforms />
          </button>
          <button
            onClick={() => router.push(`/admin/stage?categoryId=${row.id}`)}
            title="Tahap Kompetisi"
            className="me-2 rounded bg-blue-100 p-2.5 text-xs font-medium text-blue-800 transition-all hover:bg-blue-700 hover:text-white"
          >
            <MdLeaderboard />
          </button>
          {role !== "ADMIN" && (
            <>
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
            </>
          )}
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
        disabled={role === "ADMIN"}
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
