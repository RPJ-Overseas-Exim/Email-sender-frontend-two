import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { FaChevronDown } from "react-icons/fa6";

export default function ProductsSelector({
  field,
  allProducts,
}: {
  allProducts: string[];
  field: ControllerRenderProps<
    {
      allProducts: string[];
      products: string[];
      type: "enquiry" | "reorder" | "reorderDefault" | "enquiryDefault";
      hour: string;
      status: "active" | "inactive";
      minute: string;
      daysOfWeek: string;
      limit: string;
    },
    "products"
  >;
}) {
  const [products, setProducts] = useState<string[]>(field.value);

  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex items-center justify-center gap-2 rounded-md border border-border p-2">
          <p className="text-sm">Products</p>
          <FaChevronDown className="text-xs" />
        </div>
      </PopoverTrigger>
      <PopoverContent>
        {allProducts.map((product, index) => {
          return (
            <div key={index} className="flex w-full items-center gap-2">
              <Checkbox
                id={product}
                defaultChecked={products.includes(product)}
                onCheckedChange={() => {
                  let newProducts: string[];
                  if (products.includes(product)) {
                    newProducts = products.filter(
                      (currProduct) => currProduct !== product,
                    );
                    setProducts(newProducts);
                  } else {
                    newProducts = [...products, product];
                    setProducts([...products, product]);
                  }
                  field.onChange(newProducts);
                }}
              />
              <label htmlFor={product} className="capitalize">
                {product}
              </label>
            </div>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
