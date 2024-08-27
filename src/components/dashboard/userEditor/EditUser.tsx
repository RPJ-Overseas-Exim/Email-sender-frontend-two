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
import UserZod, { User } from "@/lib/types/UserEditor";
import PutRequest from "@/lib/requestHellpers/PutRequest";

export default function EditUser({ user }: { user: User }) {
  console.log(user);
  const editForm = useForm<User>({
    resolver: zodResolver(UserZod),
    defaultValues: {
      ...user,
    },
  });

  const handleSubmit = async (user: User) => {
    try {
      const res = await PutRequest("/users/" + user.id, { ...user });
      console.log(res);
      if (res?.data) {
        toast.success("User Edited successfully.");
        return revalPath("/dashboard/users");
      }
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
            <DialogTitle>Edit Order</DialogTitle>
            <DialogDescription>
              Edit and update the order in the database.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={editForm.handleSubmit(handleSubmit)}>
            <div className="my-4 flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...editForm.register("username")} />
                {editForm.formState.errors.username && (
                  <p className="m-0 text-sm text-red-400">
                    {editForm.formState.errors.username.message}
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

            <div className="my-4 flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="number">Password</Label>
                <Input id="number" {...editForm.register("password")} />
                {editForm.formState.errors.password && (
                  <p className="m-0 text-sm text-red-400">
                    {editForm.formState.errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="my-4 flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" {...editForm.register("role")} />
                {editForm.formState.errors.role && (
                  <p className="m-0 text-sm text-red-400">
                    {editForm.formState.errors.role.message}
                  </p>
                )}
              </div>
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
