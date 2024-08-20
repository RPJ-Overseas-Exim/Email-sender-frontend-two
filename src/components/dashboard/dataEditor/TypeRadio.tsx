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

export default function TypeRadio({
  setType,
  getType,
}: {
  setType: (type: "enquiry" | "reorder") => void;
  getType: () => string;
}) {
  const [value, setValue] = React.useState(getType());

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{getType() || "Select type"}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(value) => {
            if (value === "enquiry" || value === "reorder") {
              setType(value);
              setValue(getType());
            }
          }}
        >
          <DropdownMenuRadioItem value="enquiry">Enquiry</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="reorder">Reorder</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
