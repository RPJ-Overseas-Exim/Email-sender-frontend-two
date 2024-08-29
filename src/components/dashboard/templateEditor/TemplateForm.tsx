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
import { Textarea } from "@/components/ui/textarea";
import TypeRadio from "@/components/dashboard/dataEditor/TypeRadio";
import PostRequest from "@/lib/requestHelpers/PostRequest";
import { Template, TemplateZod } from "@/lib/types/TemplateEditor";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import PutRequest from "@/lib/requestHelpers/PutRequest";
import revalPath from "@/lib/serverActions/revalPath";
import { useRouter } from "next/navigation";
import DeleteRequest from "@/lib/requestHelpers/DeleteRequest";

export default function TemplateForm({
  templates,
}: {
  templates: { [name: string]: { [x: string]: string } };
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const form = useForm<Template>({
    resolver: zodResolver(TemplateZod),
    defaultValues: {},
  });

  const onSubmit = async (data: Template) => {
    try {
      let res;
      if (searchParams.get("template")) {
        res = await PutRequest(
          "/templates/" + data.type + "-" + searchParams.get("template"),
          {
            ...data,
            name: data.type + "-" + data.name.toLowerCase(),
          },
        );
      } else {
        res = await PostRequest("/templates", {
          ...data,
          name: data.type + "-" + data.name.toLowerCase(),
        });
      }
      if (res.data) {
        revalPath("/dashboard/template");
        resetForm();
        toast.success(res.message);
      } else if (res.error) toast.error(res.error);
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

  const deleteTemplate = async (data: Template) => {
    try {
      const res = await DeleteRequest(
        "/templates/" + data.type + "-" + data.name,
      );
      if (res.data) {
        revalPath("/dashboard/template");
        router.push("/dashboard/template");
        toast.success(res.message);
      } else if (res.error) toast.error(res.error);
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    form.reset();
    router.push("/dashboard/template");
  };

  useEffect(() => {
    form.setValue("name", searchParams.get("template") ?? "");
    form.setValue(
      "type",
      searchParams.get("type") === "enquiry" || null ? "enquiry" : "reorder",
    );
    form.setValue(
      "body",
      templates?.[searchParams.get("template") ?? ""]?.body ?? "",
    );
    form.setValue(
      "subject",
      templates?.[searchParams.get("template") ?? ""]?.subject ?? "",
    );
  }, [searchParams, form.setValue]);
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 overflow-auto">
      <div className="min-w-xs w-full rounded-lg border border-border bg-card">
        <Form {...form}>
          <form className="flex flex-col items-start justify-center gap-3 p-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <div className="flex w-full items-end justify-between gap-4">
                      <Input
                        placeholder="Template name"
                        className="capitalize"
                        {...field}
                      />
                      <TypeRadio setType={setType} getType={getType} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="w-fit">
                    <FormControl>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

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
            <div className="flex w-full justify-between">
              <Button
                type="submit"
                className="mt-4 bg-deepBlue"
                onClick={form.handleSubmit(onSubmit)}
              >
                Submit
              </Button>
              <div className="space-x-2">
                <Button
                  type="submit"
                  className="mt-4 bg-red-600"
                  onClick={form.handleSubmit(deleteTemplate)}
                >
                  Delete
                </Button>
                <Button
                  type="button"
                  className="mt-4 bg-green-600"
                  onClick={() => resetForm()}
                >
                  Reset
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
