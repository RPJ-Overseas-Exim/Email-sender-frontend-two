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
import { Logout } from "@/lib/requestHellpers/GetRequest";

export default function SelectTable({
  data,
  count,
}: {
  data: Customer[] | null;
  count: number;
}) {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<string | undefined>(
    searchParams.get("type") ?? undefined,
  );

  const router = useRouter();
  const { auth } = useAuth();

  const handleTab = (Intab: "enquiry" | "reorder" | undefined = undefined) => {
    setTab(Intab);
    if (Intab === undefined) {
      router.push("/dashboard");
      return;
    }
    router.push("/dashboard" + "?type=" + Intab);
  };

  if (auth === undefined || !data)
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
            onClick={() => handleTab()}
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

      <div className="h-[calc(100dvh-291px)] overflow-auto lg:h-[calc(100dvh-220px)]">
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
