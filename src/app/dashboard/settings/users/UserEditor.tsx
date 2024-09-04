"use client";
import UserEditorTable from "@/components/dashboard/data-table";
import { User } from "@/lib/types/UserEditor";
import { columns } from "@/components/dashboard/userEditor/columns";

export default function UserEditor({ data }: { data: User[] | null }) {
  return <>{data && <UserEditorTable data={data} columns={columns} />}</>;
}
