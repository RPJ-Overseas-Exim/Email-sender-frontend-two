"use client";
import ImportCSV from "@/components/dashboard/dataEditor/ImportCSV";
import ExportCSV from "@/components/dashboard/dataEditor/ExportCSV";
import type { Customer } from "@/lib/types/dataEditor/dataEditor";
import useAuth from "@/components/context/AuthProvider";

export default function ImportExport({ data }: { data: Customer[] | null }) {
  const { auth } = useAuth();
  return (
    <>
      {auth?.role === "admin" && (
        <div className="flex items-center gap-1 lg:gap-4">
          <ImportCSV />
          <ExportCSV data={data} />
        </div>
      )}
    </>
  );
}
