import { Customer } from "@/lib/types/dataEditor/dataEditor";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function DataEditor() {
  const data: Customer[] = [
    {
      name: "Allen",
      email: "allen@ldfkj.com",
      product: "Zolpidem",
      status: "pending",
    },
    {
      name: "Alex",
      email: "allen@ldfkj.com",
      product: "Alprazolam",
      status: "sent",
    },
    {
      name: "Zachary",
      email: "allen@ldfkj.com",
      product: "Zolpidem",
      status: "sent",
    },
    {
      name: "John",
      email: "allen@ldfkj.com",
      product: "Zolpidem",
      status: "sent",
    },
  ];
  return (
    <section id="data-editor" className="data-editor lg:mx-auto lg:w-[96%]">
      <h1 className="sidebar__title py-8">Data Editor</h1>
      <DataTable columns={columns} data={data} />
    </section>
  );
}
