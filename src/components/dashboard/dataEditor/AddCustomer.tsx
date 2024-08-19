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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PostRequest from "@/lib/requestHellpers/PostRequest";
import ComboBox from "./ComboBox";

const formSchema = z.object({
  name: z.string().min(3, "Name should be at least 3 letters long"),
  number: z
    .string()
    .min(10, "Number should be at least 10 digits long")
    .optional(),
  email: z.string().email(),
  productId: z.string().min(4, "Product should be at least 4 letters long"),
  type: z.enum(["enquiry", "reorder"]),
});

export default function AddCustomer() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "enquiry",
    },
  });

  const handleSubmit = async (customer: z.infer<typeof formSchema>) => {
    try {
      const res = await PostRequest("/customers/" + customer.type, {
        customersData: [customer],
      });
      if (typeof res === "string") {
        return toast.error(res);
      }
      if (res !== undefined && res.length > 0) {
        return toast.success("Order Added successfully.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const setProduct = (product: string) => {
    form.setValue("productId", product);
  };

  const getProduct = () => {
    return form.getValues("productId");
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            type="button"
            size="sm"
            className="flex items-center gap-1 rounded-none border border-gray-400 bg-background text-foreground hover:border-gray-700 hover:bg-gray-700 hover:text-white"
            aria-disabled={form.formState.isSubmitting}
            disabled={form.formState.isSubmitting}
          >
            <span>Add Customer</span>
            {form.formState.isSubmitting && <Spinner w="4" h="4" b="2" />}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>New Order</DialogTitle>
            <DialogDescription>
              Add a new order to the database and send an email.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="my-4 flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...form.register("name")} />
                {form.formState.errors.name && (
                  <p className="m-0 text-sm text-red-400">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>
            </div>

            <div className="my-4 flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" {...form.register("email")} />
                {form.formState.errors.email && (
                  <p className="m-0 text-sm text-red-400">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <ComboBox setProduct={setProduct} getProduct={getProduct} />

            <div className="my-4 flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="type">Type</Label>
                <Input id="type" {...form.register("type")} />
                {form.formState.errors.type && (
                  <p className="m-0 text-sm text-red-400">
                    {form.formState.errors.type.message}
                  </p>
                )}
              </div>
            </div>

            <div className="my-4 flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="number">Number</Label>
                <Input id="number" {...form.register("number")} />
                {form.formState.errors.number && (
                  <p className="m-0 text-sm text-red-400">
                    {form.formState.errors.number.message}
                  </p>
                )}
              </div>
            </div>
            <Button
              type="submit"
              size="sm"
              className="w-full bg-sky-500 px-3 text-white hover:bg-sky-700"
              disabled={form.formState.isSubmitting}
            >
              <span>Add</span>
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
