"use client";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { FaFileDownload, FaRegTrashAlt } from "react-icons/fa";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import cn from "@/lib/cn";
import {
  registrationWithBatch,
  registrationWithMembers,
} from "@/types/relation";
import { GrNotes } from "react-icons/gr";
import { deleteRegistration } from "../actions";
import { useRouter } from "next-nprogress-bar";

export default function RegistrationsTable({
  data,
  memberData,
}: {
  data: registrationWithBatch[];
  memberData: registrationWithMembers[];
}) {
  const [loader, setLoader] = useState(true);
  const router = useRouter();

  async function deleteAction(id: string) {
    if (!confirm("Anda yakin ingin menghapus data registrasi ini?")) return;

    const toastId = toast.loading("Loading...");
    const deleteResponse = await deleteRegistration(id);

    if (!deleteResponse.success) {
      return toast.error(deleteResponse.message, { id: toastId });
    }

    toast.success(deleteResponse.message, { id: toastId });
    router.refresh();
  }

  const exportToExcel = ({ data }: { data: registrationWithMembers[] }) => {
    const dataToExport: Array<{ [key: string]: string | number }> = [];
    data.forEach((row, index) => {
      row.teamMembers.forEach((member, memberIndex) => {
        dataToExport.push({
          "No.": memberIndex === 0 ? index + 1 : "",
          "Team Members": member.name,
          "Asal Sekolah": memberIndex === 0 ? row.schoolName : "",
          "Grade Level": member.gradeLevel,
          "Team Name": memberIndex === 0 ? row.teamName : "",
        });
      });
    });

    // Create worksheet from data
    const worksheet = XLSX.utils.json_to_sheet(dataToExport, {
      header: [
        "No.",
        "Team Members",
        "Asal Sekolah",
        "Team Name",
        "Grade Level",
      ],
    });

    // Create workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");

    // Set column widths
    worksheet["!cols"] = [
      { wch: 3 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
    ];

    const excelData = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelData], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "Registration Data.xlsx";
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleExportToExcel = () => {
    exportToExcel({ data: memberData });
  };

  const columns: TableColumn<registrationWithBatch>[] = [
    {
      name: "#",
      selector: (_, i) => i! + 1,
      sortable: false,
    },
    {
      name: "Competition",
      selector: (row) =>
        `${row.registrationBatch.batchName} - ${row.registrationBatch.competitionCategory.competition.name}`,
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
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <div
          className={cn(
            "me-2 rounded p-2.5 text-xs font-medium transition-all hover:text-white",
            row.status === "PENDING"
              ? "bg-yellow-200 text-yellow-800 hover:bg-yellow-700"
              : row.status === "ACCEPTED"
                ? "bg-green-100 text-green-800 hover:bg-green-700"
                : "bg-red-100 text-red-800 hover:bg-red-700",
          )}
        >
          {row.status === "PENDING" ? "UN-REVIEWED" : row.status}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/admin/registration/${row.id}`)}
            title="Detail Registration"
            className="me-2 rounded bg-blue-100 p-2.5 text-xs font-medium text-blue-800 transition-all hover:bg-blue-700 hover:text-white"
          >
            <GrNotes />
          </button>
          <button
            onClick={() => deleteAction(row.id)}
            title="Delete Registration"
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
    <div>
      <div className="flex">
        <button
          title="Download Data"
          onClick={handleExportToExcel}
          className="me-2 flex items-center gap-2 rounded bg-green-100 p-2.5 text-xs font-medium text-green-800 transition-all hover:bg-green-700 hover:text-white"
        >
          <FaFileDownload />
          <span>Download Data</span>
        </button>
      </div>
      <div className="rounded-md bg-white p-2">
        <DataTable columns={columns} data={data} pagination highlightOnHover />
      </div>
    </div>
  );
}
