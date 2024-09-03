"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ControllerRenderProps } from "react-hook-form";

export default function TypeRadio({
  field,
}: {
  field: ControllerRenderProps<
    {
      name: string;
      type: "reorder" | "enquiry";
      subject: string;
      body: string;
      id?: string | undefined;
      fullName?: string | undefined;
    },
    "type"
  >;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{field.value || "Select type"}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup
          defaultValue={field.value}
          onValueChange={field.onChange}
        >
          <DropdownMenuRadioItem value="enquiry">Enquiry</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="reorder">Reorder</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
