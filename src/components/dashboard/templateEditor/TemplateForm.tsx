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
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import TypeRadio from "@/components/dashboard/dataEditor/TypeRadio";
import PostRequest from "@/lib/requestHellpers/PostRequest";
import { Template, TemplateZod } from "@/lib/types/TemplateEditor";

export default function TemplateForm() {
  const form = useForm<z.infer<typeof TemplateZod>>({
    resolver: zodResolver(TemplateZod),
    defaultValues: {
      type: "enquiry",
    },
  });

  const onSubmit = async (data: z.infer<typeof TemplateZod>) => {
    try {
      const res = await PostRequest("/templates", {
        ...data,
        name: data.type + "-" + data.name.toLowerCase(),
      });
      if (res.data) toast.success(res.message);
      else if (res.error) toast.error(res.error);
    } catch (error) {
      console.log(error);
    }
  };

  const setType = (type: "enquiry" | "reorder") => {
    return form.setValue("type", type);
  };
  const getType = () => {
    return form.getValues("type");
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 overflow-auto">
      <div className="min-w-xs w-full rounded-lg border border-border bg-card">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-start justify-center gap-3 p-8"
          >
            <div className="flex w-full items-end justify-between gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Template name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="w-fit">
                    <FormControl>
                      <TypeRadio
                        setType={setType}
                        getType={getType}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Subject" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Body</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Body" {...field} />
                  </FormControl>
                  <FormMessage />
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
      <Toaster richColors closeButton />
    </div>
  );
}
