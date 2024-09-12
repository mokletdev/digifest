"use client";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { FaPencilAlt, FaRegTrashAlt, FaTable } from "react-icons/fa";
import { toast } from "sonner";

import { Button } from "@/app/_components/global/button";
import { registrationBatchWithCompetitionCategoryAndRegistrants } from "@/types/relation";
import Modal from "./modal";
import { stringifyCompleteDate } from "@/utils/utils";
import { deleteRegistrationBatch } from "../actions";
import { useRouter } from "next-nprogress-bar";

export default function RegistrationBatchesTable({
  data,
  competitionCategories,
}: {
  data: registrationBatchWithCompetitionCategoryAndRegistrants[];
  competitionCategories: { name: string; id: string }[];
}) {
  const [loader, setLoader] = useState(true);
  const [editModalData, setEditModalData] =
    useState<registrationBatchWithCompetitionCategoryAndRegistrants | null>(
      null,
    );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const router = useRouter();

  function editRegistrationBatch(
    data: registrationBatchWithCompetitionCategoryAndRegistrants,
  ) {
    setEditModalData(data);
    setIsCreateModalOpen(false);
    setIsEditModalOpen(true);
  }

  function createRegistrationBatch() {
    setEditModalData(null);
    setIsEditModalOpen(false);
    setIsCreateModalOpen(true);
  }

  async function deleteAction(id: string) {
    if (!confirm("Anda yakin ingin menghapus Kategori ini?")) return;

    const toastId = toast.loading("Loading...");
    const deleteResponse = await deleteRegistrationBatch(id);

    if (!deleteResponse.success) {
      return toast.error(deleteResponse.message, { id: toastId });
    }

    toast.success(deleteResponse.message, { id: toastId });
    router.refresh();
  }

  const columns: TableColumn<registrationBatchWithCompetitionCategoryAndRegistrants>[] =
    [
      {
        name: "#",
        selector: (_, i) => i! + 1,
        sortable: false,
      },
      {
        name: "Nama",
        selector: (row) => `${row.batchName} - ${row.competitionCategory.name}`,
        sortable: true,
      },
      {
        name: "Open Date",
        selector: (row) => stringifyCompleteDate(row.openedDate),
        sortable: false,
      },
      {
        name: "Close Date",
        selector: (row) => stringifyCompleteDate(row.closedDate),
        sortable: false,
      },
      {
        name: "Registrants",
        selector: (row) => row.registrations.length,
        width: "300px",
        center: true,
        cell: (row) => (
          <div className="flex gap-2 text-nowrap">
            <div
              title="Pending Registants"
              className="rounded bg-gray-100 p-2.5 text-xs font-medium text-gray-800 transition-all"
            >
              {
                row.registrations.filter(
                  (regist) => regist.status === "PENDING",
                ).length
              }{" "}
              Pend
            </div>
            <div
              title="Accepted Registants"
              className="rounded bg-green-100 p-2.5 text-xs font-medium text-green-800 transition-all"
            >
              {
                row.registrations.filter(
                  (regist) => regist.status === "ACCEPTED",
                ).length
              }{" "}
              Acc
            </div>
            <div
              title="Rejected Registants"
              className="rounded bg-red-100 p-2.5 text-xs font-medium text-red-800 transition-all"
            >
              {
                row.registrations.filter(
                  (regist) => regist.status === "REJECTED",
                ).length
              }{" "}
              Reject
            </div>
          </div>
        ),
        sortable: true,
      },
      {
        name: "Action",
        cell: (row) => (
          <div className="flex gap-2">
            <button
              onClick={() =>
                router.push(`/admin/registration?batchId=${row.id}`)
              }
              title="Registrants Data"
              className="me-2 rounded bg-blue-100 p-2.5 text-xs font-medium text-blue-800 transition-all hover:bg-blue-700 hover:text-white"
            >
              <FaTable />
            </button>
            <button
              onClick={() => editRegistrationBatch(row)}
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
          createRegistrationBatch();
        }}
      >
        Add Gelombang Pendaftaran
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
