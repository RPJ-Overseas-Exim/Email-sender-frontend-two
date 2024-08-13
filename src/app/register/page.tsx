"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { PoppinsHeading } from "@/lib/fonts";
import PostRequest from "@/lib/requestHellpers/PostRequest";
import { useEffect } from "react";

const formSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be of atleast 3 length")
    .max(16, "Username cannot exceed 16 length"),
  email: z.string().email(),
  password: z
    .string()
    .trim()
    .min(8, "Password must be of atleast 8 length")
    .max(16, "Password length cannot exceed 16"),
  confirmPassword: z.string().trim(),
});

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (data.password !== data.confirmPassword)
        form.setError("confirmPassword", {
          type: "custom",
          message: "Both the passwords do not match",
        });
      const res = await PostRequest("/users", {
        ...data,
        confirmPassword: null,
      });
      if (res.ok) {
        console.log("registeration successfull");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section
      id="loginForm"
      className="flex h-dvh w-full flex-col items-center justify-center gap-4 bg-secondary"
    >
      <div className="min-w-xs w-[90%] max-w-[24rem] rounded-2xl bg-card shadow-lg md:w-5/6">
        <Form {...form}>
          <h1
            className={
              PoppinsHeading.className +
              " w-full border-b border-border py-4 text-center text-3xl font-bold"
            }
          >
            Register
          </h1>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-start justify-center gap-3 px-8 py-4"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your e-mail" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Confirm your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-4 bg-deepBlue">
              Submit
            </Button>
          </form>
        </Form>
      </div>
      <p className="text-xs text-muted-foreground md:text-sm">
        Already have an account?{" "}
        <Link href="/" className="text-deepBlue underline">
          Login
        </Link>
      </p>
    </section>
  );
}
