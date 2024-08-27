"use client";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { toast } from "sonner";

import { deleteUser } from "../actions";

import { Button } from "@/app/_components/global/button";
import { user } from "@prisma/client";
import { useRouter } from "next/navigation";
import Modal from "./modal";

export default function UserTable({ data }: { data: user[] }) {
  const [loader, setLoader] = useState(true);
  const [editModalData, setEditModalData] = useState<user | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const router = useRouter();

  const columns: TableColumn<user>[] = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: false,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: false,
    },
    {
      name: "Role",
      selector: (row) => row.role,

      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => editUser(row)}
            title="Edit User"
            className="me-2 rounded bg-blue-100 p-2.5 text-xs font-medium text-blue-800 transition-all hover:bg-blue-700 hover:text-white"
          >
            <FaPencilAlt />
          </button>
          <button
            onClick={() => deleteAction(row.id)}
            title="Delete User"
            className="me-2 rounded bg-red-100 p-2.5 text-xs font-medium text-red-800 transition-all hover:bg-red-700 hover:text-white"
          >
            <FaRegTrashAlt />
          </button>
        </div>
      ),
    },
  ];

  function editUser(data: user) {
    setEditModalData(data);
    setIsCreateModalOpen(false);
    setIsEditModalOpen(true);
  }

  function createUser() {
    setEditModalData(null);
    setIsEditModalOpen(false);
    setIsCreateModalOpen(true);
  }

  async function deleteAction(id: string) {
    if (!confirm("Anda yakin ingin menghapus user ini?")) return;

    const toastId = toast.loading("Loading...");
    const deleteResponse = await deleteUser(id);

    if (!deleteResponse.success)
      return toast.error(deleteResponse.message, { id: toastId });

    toast.success(deleteResponse.message, { id: toastId });
    router.refresh();
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
          createUser();
        }}
      >
        Add user
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
