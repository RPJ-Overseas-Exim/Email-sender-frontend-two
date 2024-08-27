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
import { useRouter } from "next/navigation";
import React from "react";

export default function DashboardPagination({ count }: { count: number }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [page, setPage] = React.useState<number>(1);
  const lastPage = Math.ceil(count / (Number(searchParams.get("limit")) || 10));

  const createQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    return params.toString();
  };

  React.useEffect(() => {
    router.push("/dashboard?" + createQuery("offset", String(page - 1)));
  }, [page]);

  React.useEffect(() => {
    setPage(
      searchParams.get("offset") ? Number(searchParams.get("offset")) + 1 : 1,
    );
  }, [searchParams]);
  return (
    <Pagination className="shop__pagination my-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationFirst
            onClick={() => setPage(1)}
            href={"/dashboard?" + createQuery("offset", "0")}
          />
        </PaginationItem>

        {page - 2 >= 1 && (
          <PaginationItem>
            <PaginationLink
              onClick={() => {
                setPage(page - 1);
              }}
              href={"/dashboard?" + createQuery("offset", String(page - 1))}
              className="rounded-md bg-[var(--bg-light)] hover:bg-gray-200"
            >
              {page - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem className="rounded-md border border-[var(--text-gray)]">
          <PaginationLink href="#">{page}</PaginationLink>
        </PaginationItem>

        {page + 1 <= lastPage && (
          <PaginationItem>
            <PaginationLink
              href={"/dashboard?" + createQuery("offset", String(page))}
              onClick={() => {
                setPage(page + 1);
              }}
              className="rounded-md bg-[var(--bg-light)] hover:bg-gray-200"
            >
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLast
            onClick={() => setPage(lastPage)}
            href={"/dashboard?" + createQuery("offset", String(lastPage - 1))}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
