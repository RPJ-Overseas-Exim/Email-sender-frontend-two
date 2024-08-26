"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Customer } from "@/lib/types/dataEditor/dataEditor";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { IoIosMore } from "react-icons/io";
import DeleteRequest from "@/lib/requestHellpers/DeleteRequest";
import { toast } from "sonner";
import revalPath from "@/lib/serverActions/revalPath";
import PostRequest from "@/lib/requestHellpers/PostRequest";
import { useSearchParams } from "next/navigation";
import EditCustomer from "./EditCustomer";
import ViewCustomer from "./ViewCustomer";
import { cn } from "@/lib/utils";

const AdminCell = ({ customer }: { customer: Customer }) => {
  const searchParams = useSearchParams();
  const undoDelete = async (data: Customer) => {
    try {
      let undoRes;
      if (searchParams.get("tab"))
        undoRes = await PostRequest("/customers" + searchParams.get("tab"), {
          customersData: [data],
        });
      else
        undoRes = await PostRequest("/customers/enquiry", {
          customersData: [data],
        });
      console.log(undoRes);
      if (undoRes.data) {
        toast.success("Operation undone.");
      }
    } catch (error) {
      console.error("Error while deleting customer: ", error);
      toast.error("Operation cannot be undone");
    } finally {
      revalPath("/dashboard");
    }
  };

  const deleteCustomer = async (id: string | undefined) => {
    if (!id) return;
    const res = await DeleteRequest("/customers/" + id);
    if (res.data) {
      const data = res.data;
      toast(res.message, {
        action: {
          label: "Undo",
          onClick: () => undoDelete(data),
        },
      });
    }
    if (res.error) {
      toast.error(res.error);
    }
    revalPath("/dashboard");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <IoIosMore className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(customer.email)}
        >
          Copy Email
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            deleteCustomer(customer.id);
          }}
        >
          Delete Customer
        </DropdownMenuItem>
        <EditCustomer customer={customer} />
        <DropdownMenuSeparator />
        <ViewCustomer customer={customer} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

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
    accessorKey: "productId",
    header: "Product",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { status } = row.original;
      return (
        <p
          id="number"
          className={cn(
            "flex w-fit items-center gap-2 rounded-sm border px-2",
            status === "pending"
              ? "border-red-600 text-red-600"
              : "border-green-600 text-green-600",
          )}
        >
          {status}
        </p>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <AdminCell customer={row.original} />;
    },
  },
];

export const userColumns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "productId",
    header: "Product",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { status } = row.original;
      return (
        <p
          id="number"
          className={cn(
            "flex w-fit items-center gap-2 rounded-sm border px-2",
            status === "pending"
              ? "border-red-600 text-red-600"
              : "border-green-600 text-green-600",
          )}
        >
          {status}
        </p>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <IoIosMore className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <ViewCustomer customer={row.original} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
