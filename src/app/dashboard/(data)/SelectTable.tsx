"use client";
import { Customer } from "@/lib/types/dataEditor/dataEditor";
import { CustomerTable } from "./data-table";
import { columns, userColumns } from "./columns";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useSearchParams, useRouter } from "next/navigation";
import useAuth from "@/components/context/AuthProvider";
import { UserTable } from "./user-data-table";

export default function SelectTable({ data }: { data: Customer[] }) {
  const [tab, setTab] = useState<"enquiry" | "reorder" | undefined>(undefined);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { auth } = useAuth();

  const handleTab = (tab: "enquiry" | "reorder" | undefined = undefined) => {
    setTab(tab);
    if (tab === undefined) return router.push("/dashboard");
    router.push("/dashboard" + "?tab=" + tab);
  };
  useEffect(() => {
    if (searchParams.get("enquiry")) {
      setTab("enquiry");
    } else if (searchParams.get("reorder")) {
      setTab("reorder");
    }
  }, [setTab]);
  return (
    <div>
      <div className="mb-4 flex items-start text-sm font-semibold text-muted-foreground">
        <button
          type="button"
          className={cn(
            "px-2 py-1 hover:bg-muted",
            tab === undefined && "dataTable__tab--active",
          )}
          onClick={() => handleTab(undefined)}
        >
          All
        </button>
        <button
          type="button"
          className={cn(
            "px-2 py-1 hover:bg-muted",
            tab === "enquiry" && "dataTable__tab--active",
          )}
          onClick={() => handleTab("enquiry")}
        >
          Enquiry
        </button>
        <button
          type="button"
          className={cn(
            "px-2 py-1 hover:bg-muted",
            tab === "reorder" && "dataTable__tab--active",
          )}
          onClick={() => handleTab("reorder")}
        >
          Reorder
        </button>
      </div>

      {auth.role === "user" ? (
        <UserTable columns={userColumns} data={data} />
      ) : (
        <CustomerTable columns={columns} data={data} />
      )}
    </div>
  );
}
