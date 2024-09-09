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
import SchedulerZod, { type Scheduler } from "@/lib/types/Scheduler";
import { getGMTTime, getISTTime } from "@/lib/utils";
import DaysOfWeek from "./DaysOfWeek";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ProductsSelector from "./ProductsSelector";

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
      schedule.minute = minutes;
      schedule.hour = hours;

      if (parseInt(schedule.limit) >= 1) {
        const resLimit = await PutRequest("/pointers?name=" + schedule.type, {
          limit: schedule.limit,
        });
        if (!resLimit.data) {
          toast.error("Schedule Edit Failed");
          return;
        }
      }

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
            <DialogTitle>
              Edit Schedule: {editForm.getValues("type")}
            </DialogTitle>
            <DialogDescription>
              Edit and update the schedule for the email sender app.
            </DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
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

              <div className="my-4 flex w-full items-end justify-between gap-4">
                <FormField
                  name="limit"
                  control={editForm.control}
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FormLabel>Limit</FormLabel>
                        <FormControl>
                          <Input placeholder="Limit" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>

              <div className="my-4 grid grid-cols-2 items-end gap-2">
                <FormField
                  name="products"
                  control={editForm.control}
                  render={({ field }) => {
                    return (
                      <ProductsSelector
                        allProducts={schedule.allProducts}
                        field={field}
                      />
                    );
                  }}
                />
                <DaysOfWeek
                  getDaysOfWeek={() => editForm.getValues("daysOfWeek")}
                  setDaysOfWeek={(days: string) =>
                    editForm.setValue("daysOfWeek", days)
                  }
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
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
