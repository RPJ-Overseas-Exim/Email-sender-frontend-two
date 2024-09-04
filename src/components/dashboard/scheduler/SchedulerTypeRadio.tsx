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
import { TypeEnum } from "@/lib/types/Scheduler";
import { FaChevronDown } from "react-icons/fa6";

export default function SchedulerTypeRadio({
  setType,
  getType,
  ...field
}: {
  setType: (type: TypeEnum) => void;
  getType: () => TypeEnum;
}) {
  const [value, setValue] = React.useState(getType());

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <span>{getType() || "Select type"}</span>
          <FaChevronDown className="text-xs" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(value) => {
            if (
              value === "enquiry" ||
              value === "reorder" ||
              value === "enquiryDefault" ||
              value === "reorderDefault"
            ) {
              setType(value);
              setValue(getType());
            }
          }}
          {...field}
        >
          <DropdownMenuRadioItem value="enquiry">Enquiry</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="reorder">Reorder</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="enquiryDefault">
            EnquiryDefault
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="reorderDefault">
            ReorderDefault
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
