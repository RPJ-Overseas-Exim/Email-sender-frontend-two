import { ColumnDef } from "@tanstack/react-table";
import { Customer } from "@/lib/types/dataEditor/dataEditor";

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "product",
    header: "Product",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
