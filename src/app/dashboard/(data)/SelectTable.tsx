"use client";
import { Customer } from "@/lib/types/dataEditor/dataEditor";
import { CustomerTable } from "../../../components/dashboard/dataEditor/data-table";
import {
  columns,
  userColumns,
} from "../../../components/dashboard/dataEditor/columns";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useSearchParams, useRouter } from "next/navigation";
import useAuth from "@/components/context/AuthProvider";
import { UserTable } from "../../../components/dashboard/dataEditor/user-data-table";
import Spinner from "@/components/ui/Spinner";
import AddCustomer from "../../../components/dashboard/dataEditor/AddCustomer";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationFirst,
//   PaginationLast,
// } from "@/components/ui/pagination";

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

      <div className="h-[calc(100dvh-172px)] overflow-auto">
        {auth && auth.role === "admin" ? (
          <CustomerTable columns={columns} data={data} />
        ) : (
          <UserTable columns={userColumns} data={data} />
        )}
      </div>
      {/* <Pagination className="shop__pagination mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationFirst
                href={`/shop?${createQuery("page", "1")}`}
                onClick={() => setPage(1)}
              />
            </PaginationItem>
            {page - 1 >= 1 && (
              <PaginationItem>
                <PaginationLink
                  href={`/shop?${createQuery("page", String(page - 1))}`}
                  onClick={() => setPage(page - 1)}
                  className="bg-[var(--bg-light)] rounded-md hover:bg-gray-200"
                >
                  {page - 1}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem className="border border-[var(--text-gray)] rounded-md">
              <PaginationLink href={`/shop?${createQuery("page", String(page))}`}>
                {page}
              </PaginationLink>
            </PaginationItem>
            {page + 1 <= lastPage && (
              <PaginationItem>
                <PaginationLink
                  href={`/shop?${createQuery("page", String(page + 1))}`}
                  onClick={() => setPage(page + 1)}
                  className="bg-[var(--bg-light)] rounded-md hover:bg-gray-200"
                >
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLast
                href={`/shop?${createQuery("page", String(lastPage))}`}
                onClick={() => setPage(lastPage)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination> */}
    </div>
  );
}
