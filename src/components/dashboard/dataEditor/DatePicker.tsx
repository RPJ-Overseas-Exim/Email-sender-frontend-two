"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({
  startDate,
  setFilters,
  endDate,
}: {
  startDate: Date | undefined;
  endDate: Date | undefined;
  setFilters: React.Dispatch<
    React.SetStateAction<{
      limit: number;
      startDate: Date | undefined;
      endDate: Date | undefined;
    }>
  >;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !startDate && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {startDate ? (
            endDate ? (
              <>
                {format(startDate, "LLL dd, y")} -{" "}
                {format(endDate, "LLL dd, y")}
              </>
            ) : (
              format(startDate, "LLL dd, y")
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="range"
          selected={
            startDate && endDate ? { from: startDate, to: endDate } : undefined
          }
          onSelect={(date) =>
            setFilters((filters) => {
              if (date)
                return {
                  ...filters,
                  startDate: date?.from ?? new Date(),
                  endDate: date?.to ?? new Date(),
                };
              return filters;
            })
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
