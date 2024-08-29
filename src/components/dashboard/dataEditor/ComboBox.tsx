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
import GetRequest from "@/lib/requestHelpers/GetRequest";
import { useQuery } from "@tanstack/react-query";

export default function Combobox({
  setProduct,
  getProduct,
}: {
  setProduct: (product: string) => void;
  getProduct: () => string;
}) {
  const [open, setOpen] = React.useState(false);

  const getProducts = async () => {
    try {
      const res = await GetRequest("/products");
      if (res.data) return res.data;
      return [];
    } catch (error) {
      console.error("Fetch Failed", error);
    }
  };

  const query = useQuery({
    queryKey: ["productDetails"],
    queryFn: getProducts,
  });

  const getCurrentProduct = () => {
    return query.data?.find(
      (product: { name: string; id: string }) =>
        product.id === getProduct() || product.name === getProduct(),
    );
  };

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
            {getProduct() ? getCurrentProduct()?.name : "Select Product..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search Products..." />
            <CommandList>
              <CommandEmpty>No Products found.</CommandEmpty>
              <CommandGroup>
                {query.data?.map((product: { name: string; id: string }) => (
                  <CommandItem
                    key={product.name}
                    value={product.name}
                    id={product.id}
                    onSelect={() => {
                      setProduct(
                        product.id === getCurrentProduct()?.id
                          ? ""
                          : product.id,
                      );
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4 text-foreground",
                        getProduct() === product.id
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {product.name}
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
