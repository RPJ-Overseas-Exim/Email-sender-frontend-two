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

export function StartDatePicker({
  startDate,
  setFilters,
}: {
  startDate: Date | undefined;
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
            <>{format(startDate, "LLL dd, y")} - </>
          ) : (
            <span>Pick a start date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={startDate}
          onSelect={(date) => {
            setFilters((filters) => {
              return {
                ...filters,
                startDate: date ?? new Date(),
              };
            });
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
