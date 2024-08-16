"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { PoppinsHeading } from "@/lib/fonts";
import { Login as login } from "@/lib/requestHellpers/PostRequest";
import { useRouter } from "next/navigation";
import useAuth from "@/components/context/AuthProvider";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be of atleast 8 length")
    .max(16, "Password length cannot exceed 16"),
});

export default function Login() {
  const router = useRouter();
  const { auth, setAuth } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await login(data);
      if (res.token) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
      setAuth({ login: "false", role: "" });
    }
  };

  useEffect(() => {
    if (auth.login) {
      router.push("/dashboard");
    }
  }, [auth.login]);
  return (
    <section
      id="loginForm"
      className="flex h-dvh w-full flex-col items-center justify-center gap-4 overflow-auto bg-secondary"
    >
      <div className="min-w-xs w-[90%] max-w-[24rem] rounded-2xl bg-card shadow-lg md:w-5/6">
        <Form {...form}>
          <h1
            className={
              PoppinsHeading.className +
              " w-full border-b border-border py-4 text-center text-3xl font-bold"
            }
          >
            Login
          </h1>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-start justify-center gap-3 px-8 py-4"
          >
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
                  <FormDescription className="text-sm text-deepBlue underline">
                    <Link href="/">Forgot your password?</Link>
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-4 bg-deepBlue"
              disabled={form.formState.isSubmitting}
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
      <p className="text-xs text-muted-foreground md:text-sm">
        Don't have an account?{" "}
        <Link href="/register" className="text-deepBlue underline">
          Register
        </Link>
      </p>
    </section>
  );
}
