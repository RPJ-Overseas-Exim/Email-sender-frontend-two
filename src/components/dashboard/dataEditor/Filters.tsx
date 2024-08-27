"use client";
import { FaFilter } from "react-icons/fa6";
import { X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { DatePicker } from "./DatePicker";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useRouter } from "next/navigation";

function FilterTitle({ title }: { title: string }) {
  return <h3 className="text-base font-bold capitalize">{title}</h3>;
}

const FiltersZod = z.object({
  limit: z.number(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

export default function Filters() {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [filters, setFilters] = useState({
    limit: Number(searchParams.get("limit")) ?? 10,
    startDate: searchParams.get("startDate")
      ? new Date(new Date().setDate(Number(searchParams.get("startDate"))))
      : undefined,
    endDate: searchParams.get("endDate")
      ? new Date(new Date().setDate(Number(searchParams.get("endDate"))))
      : undefined,
  });

  const applyFilters = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const { success, error } = FiltersZod.safeParse(filters);
    const SParams = new URLSearchParams(searchParams);
    if (!success) {
      console.log(error);
      return;
    }
    for (const [query, value] of Object.entries(filters)) {
      if (query === "startDate" || query === "endDate") {
        if (!(value instanceof Date)) continue;
        SParams.set(
          query,
          `${value.getFullYear()}-${value.getMonth()}-${value.getDate()}`,
        );
        continue;
      }
      SParams.set(query, String(value));
    }

    SParams.set("offset", "0");
    router.push("/dashboard?" + SParams.toString());
    return;
  };

  return (
    <section id="filters" className="ml-2 self-center">
      <button type="button" onClick={() => setOpen((prev) => !prev)}>
        <FaFilter className="text-base transition hover:text-foreground md:text-lg" />
      </button>
      <div
        className={cn(
          "fixed bottom-0 left-0 top-0 z-[50] h-dvh w-full border-r border-border bg-background transition duration-300 md:w-[50%] lg:h-full lg:w-[25%]",
          open ? "translate-x-0" : "translate-x-[-100%]",
        )}
      >
        <aside className="filters-sidebar">
          <div className="sidebar__header" style={{ display: "flex" }}>
            <h1 className="text-2xl font-bold text-foreground">Filters</h1>
            <div
              className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
              onClick={() => setOpen((prev) => !prev)}
              role="button"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </div>
          </div>

          <form className="mx-auto flex w-[80%] flex-col gap-4">
            <div>
              <FilterTitle title={"Limit"} />
              <Input
                type="number"
                value={filters.limit}
                onChange={(e) =>
                  setFilters((filters) => {
                    return { ...filters, limit: Number(e.target.value) ?? 10 };
                  })
                }
              />
            </div>
            <div>
              <FilterTitle title={"Date"} />
              <DatePicker
                startDate={filters.startDate}
                endDate={filters.endDate}
                setFilters={setFilters}
              />
            </div>
            <Button
              type="submit"
              size="sm"
              className="mt-4 w-full bg-sky-500 px-3 text-white hover:bg-sky-700"
              onClick={applyFilters}
            >
              <span>Filter</span>
            </Button>
          </form>
        </aside>
      </div>
    </section>
  );
}
