"use client";

import * as React from "react";
import { FaCheck as Check } from "react-icons/fa6";
import { BsChevronExpand as ChevronsUpDown } from "react-icons/bs";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSearchParams } from "next/navigation";
import type { Template } from "@/lib/types/TemplateEditor";
import { useRouter } from "next/navigation";
import revalPath from "@/lib/serverActions/revalPath";

export default function TemplateCombobox({
  templates,
}: {
  templates: Template[] | [];
}) {
  const [open, setOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [template, setTemplate] = React.useState<string>("");

  React.useEffect(() => {
    if (searchParams.get("template") && searchParams.get("type"))
      setTemplate(
        searchParams.get("template") + "-" + searchParams.get("type"),
      );
    else setTemplate("");
  }, [searchParams, setTemplate]);

  return (
    <div className="my-4 flex items-center space-x-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between capitalize"
          >
            {template ? template : "Select Product..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search Products..." />
            <CommandList>
              <CommandEmpty>No Products found.</CommandEmpty>
              <CommandGroup>
                {templates.map((currTemplate: Template) => (
                  <CommandItem
                    id={currTemplate.id}
                    key={currTemplate.id}
                    value={currTemplate?.fullName ?? ""}
                    className="capitalize"
                    onSelect={() => {
                      setOpen(false);
                      setTemplate(currTemplate.name);
                      const searchP = new URLSearchParams(searchParams);
                      searchP.set("template", currTemplate?.name ?? "");
                      searchP.set("type", currTemplate.type);
                      router.push("/dashboard/template?" + searchP.toString());
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4 text-foreground",
                        currTemplate.fullName === template
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {currTemplate.fullName}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
