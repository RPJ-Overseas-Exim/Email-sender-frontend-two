"use client";
import { Customer } from "@/lib/types/dataEditor/dataEditor";
import CustomerTable from "@/components/dashboard/data-table";
import {
  columns,
  userColumns,
} from "@/components/dashboard/dataEditor/columns";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useSearchParams, useRouter } from "next/navigation";
import useAuth from "@/components/context/AuthProvider";
import { UserTable } from "@/components/dashboard/dataEditor/user-data-table";
import Spinner from "@/components/ui/Spinner";
import AddCustomer from "@/components/dashboard/dataEditor/AddCustomer";
import DashboardPagination from "@/components/dashboard/dataEditor/DashboardPagination";
import Filters from "@/components/dashboard/dataEditor/Filters";
import ThemeSwitch from "@/components/context/ThemeSwitch";

export default function SelectTable({
  data,
  count,
}: {
  data: Customer[] | null | [];
  count: number;
}) {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<string | undefined>(
    searchParams.get("type") ?? undefined,
  );

  const router = useRouter();
  const { auth } = useAuth();

  const handleTab = (Intab: "enquiry" | "reorder" | undefined = undefined) => {
    if (Intab === undefined) {
      router.push("/dashboard");
    } else {
      router.push("/dashboard" + "?type=" + Intab);
    }
    setTab(Intab);
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-start text-xs font-semibold text-muted-foreground md:text-sm">
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
          <Filters />
          <div className="ml-4 mt-[-2px] self-center lg:hidden">
            <ThemeSwitch />
          </div>
        </div>
        <AddCustomer />
      </div>

      <div className="h-[calc(100dvh-277px)] overflow-auto lg:h-[calc(100dvh-220px)]">
        {auth?.login && data ? (
          <div>
            {auth?.role === "admin" ? (
              <CustomerTable columns={columns} data={data} />
            ) : (
              <UserTable columns={userColumns} data={data} />
            )}
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Spinner />
          </div>
        )}
      </div>
      <DashboardPagination count={count} />
    </div>
  );
}
