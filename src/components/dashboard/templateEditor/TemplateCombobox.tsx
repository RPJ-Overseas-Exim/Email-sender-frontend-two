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

export default function TemplateCombobox({
  templates,
}: {
  templates: Template[] | [];
}) {
  const [open, setOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [template, setTemplate] = React.useState<string>(
    searchParams.get("template") ?? "",
  );

  return (
    <div className="my-4 flex items-center space-x-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {template !== "" ? template : "Select Product..."}
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
                    value={currTemplate.name}
                    onSelect={() => {
                      setOpen(false);
                      setTemplate(currTemplate.name);
                      const searchP = new URLSearchParams(searchParams);
                      searchP.set("template", currTemplate.name);
                      router.push("/dashboard/template?" + searchP.toString());
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4 text-foreground",
                        currTemplate.name === template
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {currTemplate.name}
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
