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
import ComboBox from "./ComboBox";
import TypeRadio from "@/components/dashboard/dataEditor/TypeRadio";
import revalPath from "@/lib/serverActions/revalPath";
import { Customer } from "@/lib/types/dataEditor/dataEditor";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import PutRequest from "@/lib/requestHellpers/PutRequest";

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(3, "Name should be at least 3 letters long"),
  number: z.string().optional(),
  email: z.string().email(),
  productId: z.string().min(4, "Product should be at least 4 letters long"),
  type: z.enum(["enquiry", "reorder"]),
});

export default function EditCustomer({ customer }: { customer: Customer }) {
  const editForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "enquiry",
      ...customer,
    },
  });

  const handleSubmit = async (customer: z.infer<typeof formSchema>) => {
    try {
      const res = await PutRequest("/customers/" + customer.id, {
        customersData: [customer],
      });
      if (res.data) {
        toast.success("Order Edited successfully.");
        return revalPath("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const setProduct = (product: string) => {
    editForm.setValue("productId", product);
  };

  const getProduct = () => {
    return editForm.getValues("productId");
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
            <DialogTitle>Edit Order</DialogTitle>
            <DialogDescription>
              Edit and update the order in the database.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={editForm.handleSubmit(handleSubmit)}>
            <div className="my-4 flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...editForm.register("name")} />
                {editForm.formState.errors.name && (
                  <p className="m-0 text-sm text-red-400">
                    {editForm.formState.errors.name.message}
                  </p>
                )}
              </div>
            </div>

            <div className="my-4 flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" {...editForm.register("email")} />
                {editForm.formState.errors.email && (
                  <p className="m-0 text-sm text-red-400">
                    {editForm.formState.errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <ComboBox setProduct={setProduct} getProduct={getProduct} />
              <TypeRadio
                setType={(type: "enquiry" | "reorder") =>
                  editForm.setValue("type", type)
                }
                getType={() => editForm.getValues("type")}
              />
            </div>

            <div className="my-4 flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="number">Number</Label>
                <Input id="number" {...editForm.register("number")} />
                {editForm.formState.errors.number && (
                  <p className="m-0 text-sm text-red-400">
                    {editForm.formState.errors.number.message}
                  </p>
                )}
              </div>
            </div>
            <DropdownMenuItem className="bg-transparent p-0">
              <Button
                type="submit"
                size="sm"
                className="w-full bg-sky-500 px-3 text-white hover:bg-sky-700"
                disabled={editForm.formState.isSubmitting}
              >
                <span>Edit</span>
              </Button>
            </DropdownMenuItem>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
