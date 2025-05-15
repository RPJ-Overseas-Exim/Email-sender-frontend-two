"use client";
import ImportCSV from "@/components/dashboard/dataEditor/ImportCSV";
import ExportCSV from "@/components/dashboard/dataEditor/ExportCSV";
import useAuth from "@/components/context/AuthProvider";

export default function ImportExport({ limit }: { limit: number }) {
    const { auth } = useAuth();
    return (
        <>
            {auth?.role === "admin" && (
                <div className="flex items-center gap-1 lg:gap-4">
                    <ImportCSV />
                    <ExportCSV limit={limit} />
                </div>
            )}
        </>
    );
}
