"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Spinner from "@/components/ui/Spinner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import revalPath from "@/lib/serverActions/revalPath";
import PutRequest from "@/lib/requestHelpers/PutRequest";
import SchedulerZod, {
  type Scheduler,
  type TypeEnum,
} from "@/lib/types/Scheduler";
import SchedulerTypeRadio from "./SchedulerTypeRadio";
import { getGMTTime, getISTTime } from "@/lib/utils";

export default function EditSchedule({ schedule }: { schedule: Scheduler }) {
  const editForm = useForm<Scheduler>({
    resolver: zodResolver(SchedulerZod),
    defaultValues: {
      ...schedule,
      minute: getISTTime(schedule.hour, schedule.minute).minutes,
      hour: getISTTime(schedule.hour, schedule.minute).hours,
    },
  });

  const handleSubmit = async (schedule: Scheduler) => {
    try {
      const { hours, minutes } = getGMTTime(schedule.hour, schedule.minute);
      console.log(hours);
      schedule.minute = minutes;
      schedule.hour = hours;
      const res = await PutRequest("/schedule/" + schedule.type, {
        ...schedule,
      });
      if (res?.message) {
        toast.success("Schedule Edited successfully.");
      }
      if (res?.error) {
        toast.error("Schedule Edit Failed");
      }
      return revalPath("/dashboard/scheduler");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            aria-disabled={editForm.formState.isSubmitting}
            disabled={editForm.formState.isSubmitting}
            className="w-full p-2 text-left text-sm hover:bg-muted"
          >
            <span>Edit</span>
            {editForm.formState.isSubmitting && <Spinner w="4" h="4" b="2" />}
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Schedule</DialogTitle>
            <DialogDescription>
              Edit and update the schedule for the email sender app.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={editForm.handleSubmit(handleSubmit)}>
            <div className="my-4 flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="hour">Hour</Label>
                <Input id="hour" {...editForm.register("hour")} />
                {editForm.formState.errors?.hour && (
                  <p className="m-0 text-sm text-red-400">
                    {editForm.formState.errors.hour.message}
                  </p>
                )}
              </div>
            </div>

            <div className="my-4 flex items-end justify-between gap-2">
              <div className="flex w-full items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="minute">Minute</Label>
                  <Input id="minute" {...editForm.register("minute")} />
                  {editForm.formState.errors.minute && (
                    <p className="m-0 text-sm text-red-400">
                      {editForm.formState.errors.minute.message}
                    </p>
                  )}
                </div>
              </div>

              <SchedulerTypeRadio
                setType={(type: TypeEnum) => editForm.setValue("type", type)}
                getType={() => editForm.getValues("type")}
              />
            </div>

            <Button
              type="submit"
              size="sm"
              className="w-full bg-sky-500 px-3 text-white hover:bg-sky-700"
              disabled={editForm.formState.isSubmitting}
            >
              <span>Edit</span>
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
