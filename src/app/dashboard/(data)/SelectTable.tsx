"use client";
import { Customer } from "@/lib/types/dataEditor/dataEditor";
import { CustomerTable } from "@/components/dashboard/dataEditor/data-table";
import {
  columns,
  userColumns,
} from "@/components/dashboard/dataEditor/columns";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useSearchParams, useRouter } from "next/navigation";
import useAuth from "@/components/context/AuthProvider";
import { UserTable } from "@/components/dashboard/dataEditor/user-data-table";
import Spinner from "@/components/ui/Spinner";
import AddCustomer from "@/components/dashboard/dataEditor/AddCustomer";
import DashboardPagination from "@/components/dashboard/dataEditor/DashboardPagination";

export default function SelectTable({
  data,
  count,
}: {
  data: Customer[];
  count: number;
}) {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<string | undefined>(
    searchParams.get("type") ?? undefined,
  );

  const router = useRouter();
  const { auth } = useAuth();

  const handleTab = (tab: "enquiry" | "reorder" | undefined = undefined) => {
    setTab(tab);
    if (tab === undefined) return router.push("/dashboard?offset=1");
    router.push("/dashboard" + "?type=" + tab + "&offset=1");
  };
  useEffect(() => {
    if (searchParams.get("enquiry")) {
      setTab("enquiry");
    } else if (searchParams.get("reorder")) {
      setTab("reorder");
    }
  }, [setTab]);

  if (auth === undefined)
    return (
      <div className="space-between flex h-[calc(100dvh-172px)] items-center justify-center">
        <Spinner />
      </div>
    );
  return (
    <div>
      <div className="flex justify-between">
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
        <AddCustomer />
      </div>

      <div className="h-[calc(100dvh-220px)] overflow-auto">
        {auth && auth.role === "admin" ? (
          <CustomerTable columns={columns} data={data} />
        ) : (
          <UserTable columns={userColumns} data={data} />
        )}
      </div>
      <DashboardPagination count={count} />
    </div>
  );
}
