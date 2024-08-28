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
import PostRequest from "@/lib/requestHelpers/PostRequest";
import revalPath from "@/lib/serverActions/revalPath";
import UserZod, { User } from "@/lib/types/UserEditor";

export default function AddUser() {
  const form = useForm<User>({
    resolver: zodResolver(UserZod),
  });

  const handleSubmit = async (user: User) => {
    console.log(user);
    try {
      const res = await PostRequest("/users", { ...user });
      if (res.data) {
        toast.success("User Added successfully.");
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
          <Button
            type="button"
            size="sm"
            className="flex items-center gap-1 rounded-none border border-gray-400 bg-background text-foreground hover:border-gray-700 hover:bg-gray-700 hover:text-white"
            aria-disabled={form.formState.isSubmitting}
            disabled={form.formState.isSubmitting}
          >
            <span>Add User</span>
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
                <Input id="name" {...form.register("username")} />
                {form.formState.errors.username && (
                  <p className="m-0 text-sm text-red-400">
                    {form.formState.errors.username.message}
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

            <div className="my-4 flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="number">Password</Label>
                <Input id="number" {...form.register("password")} />
                {form.formState.errors.password && (
                  <p className="m-0 text-sm text-red-400">
                    {form.formState.errors.password.message}
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
