"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationFirst,
  PaginationLast,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function DashboardPagination({ count }: { count: number }) {
  const searchParams = useSearchParams();
  const [page, setPage] = React.useState<number>(1);
  const lastPage = Math.ceil(count / (Number(searchParams.get("limit")) || 10));

  const createQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    return params.toString();
  };

  React.useEffect(() => {
    if (Number(searchParams.get("offset")) + 1 !== page) {
      setPage(Number(searchParams.get("offset")) + 1);
    }
  }, [searchParams]);

  return (
    <div className="relative px-8">
      <Pagination className="shop__pagination my-4">
        <PaginationContent>
          {/*first page button */}
          <PaginationItem>
            <PaginationFirst
              onClick={() => setPage(1)}
              href={"/dashboard?" + createQuery("offset", "0")}
              className="p-2 text-xs md:text-sm"
            />
          </PaginationItem>

          {/* current page button */}
          {page - 2 >= 0 && (
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  setPage(page - 1);
                }}
                href={"/dashboard?" + createQuery("offset", String(page - 2))}
                className="rounded-md bg-[var(--bg-light)] p-2 text-xs hover:bg-gray-200 md:text-sm"
              >
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {/* current page button */}
          <PaginationItem className="rounded-md border border-[var(--text-gray)]">
            <PaginationLink href="#" className="p-2 text-xs md:text-sm">
              {page}
            </PaginationLink>
          </PaginationItem>

          {/* next page button */}
          {page + 1 <= lastPage && (
            <PaginationItem>
              <PaginationLink
                href={"/dashboard?" + createQuery("offset", String(page))}
                onClick={() => {
                  setPage(page + 1);
                }}
                className="rounded-md bg-[var(--bg-light)] p-2 text-xs hover:bg-gray-200 md:text-sm"
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {/* last page button */}
          <PaginationItem>
            <PaginationLast
              onClick={() => setPage(lastPage)}
              href={"/dashboard?" + createQuery("offset", String(lastPage - 1))}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <p className="absolute left-0 top-0 h-full text-xs text-muted-foreground">
        Count:&nbsp; {count}
      </p>
    </div>
  );
}
