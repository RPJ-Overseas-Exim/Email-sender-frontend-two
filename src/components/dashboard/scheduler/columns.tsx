"use client";
import type { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { IoIosMore } from "react-icons/io";
import { toast } from "sonner";
import revalPath from "@/lib/serverActions/revalPath";
import DeleteRequest from "@/lib/requestHelpers/DeleteRequest";
import { Scheduler } from "@/lib/types/Scheduler";
import PutRequest from "@/lib/requestHelpers/PutRequest";
import EditSchedule from "./EditSchedule";
import { getISTTime } from "@/lib/utils";

const ScheduleCell = ({ schedule }: { schedule: Scheduler }) => {
  const reschedule = async () => {
    try {
      const undoRes = await PutRequest("/schedule/" + schedule.type, schedule);
      if (undoRes?.message) {
        toast.success("Operation undone");
      }
      if (undoRes?.error) {
        toast.error("Operation couldn't be undone");
      }
    } catch (error) {
      console.error("Error while deleting user: ", error);
      toast.error("Operation cannot be undone");
    } finally {
      revalPath("/dashboard/users");
    }
  };

  const stopSchedule = async (type: string | undefined) => {
    if (!type) return;
    const res = await DeleteRequest("/schedule?type=" + type);
    if (res?.message) {
      toast(res.message, {
        action: {
          label: "Undo",
          onClick: () => reschedule(),
        },
      });
    }
    if (res.error) {
      toast.error(res.error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <IoIosMore className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <EditSchedule schedule={schedule} />
        <DropdownMenuItem
          onClick={() => {
            stopSchedule(schedule.type);
          }}
        >
          Pause Schedule
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export const columns: ColumnDef<Scheduler>[] = [
  {
    accessorKey: "type",
    header: "Name",
  },
  {
    accessorKey: "daysOfWeek",
    header: "Days",
  },
  {
    accessorKey: "hour",
    header: "Hour",
    accessorFn: ({ minute: min, hour }) => {
      const { hours } = getISTTime(hour, min);
      return hours;
    },
  },
  {
    accessorKey: "minute",
    header: "Minute",
    cell: ({ row }) => {
      const min = row.original.minute;
      const hour = row.original.hour;
      const { minutes } = getISTTime(hour, min);
      return minutes;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const schedule = row.original;
      return <ScheduleCell schedule={schedule} />;
    },
  },
];
