import { User } from "@/lib/types/UserEditor";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ViewUser from "./ViewUser";
import { Button } from "@/components/ui/button";
import { IoIosMore } from "react-icons/io";
import PostRequest from "@/lib/requestHellpers/PostRequest";
import { toast } from "sonner";
import revalPath from "@/lib/serverActions/revalPath";
import DeleteRequest from "@/lib/requestHellpers/DeleteRequest";
import EditUser from "./EditUser";

const AdminCell = ({ user }: { user: User }) => {
  const undoDelete = async (data: User) => {
    try {
      const undoRes = await PostRequest("/users", { ...data });
      console.log(undoRes);
      if (undoRes.data) {
        toast.success("Operation undone.");
      }
    } catch (error) {
      console.error("Error while deleting user: ", error);
      toast.error("Operation cannot be undone");
    } finally {
      revalPath("/dashboard/users");
    }
  };

  const deleteUser = async (id: string | undefined) => {
    if (!id) return;
    const res = await DeleteRequest("/users/" + id);
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
    revalPath("/dashboard/users");
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
          onClick={() => navigator.clipboard.writeText(user.email)}
        >
          Copy Email
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            deleteUser(user.id);
          }}
        >
          Delete User
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <EditUser user={user} />
        <ViewUser user={user} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
      return <AdminCell user={user} />;
    },
  },
];
