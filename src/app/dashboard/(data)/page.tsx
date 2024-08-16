import { Customer } from "@/lib/types/dataEditor/dataEditor";
import SelectTable from "./SelectTable";
import "./dataTable.css";
import GetRequest from "@/lib/requestHellpers/GetRequest";
import { redirect } from "next/navigation";

export default async function DataEditor({
  searchParams,
}: {
  searchParams: { [x: string]: string };
}) {
  const data = await applyFilters(searchParams);
  return (
    <section id="data-editor" className="data-editor mx-auto w-[96%]">
      <h1 className="sidebar__title py-8" style={{ display: "block" }}>
        Data Editor
      </h1>
      <SelectTable data={data} />
    </section>
  );
}

function extractData(
  resData: {
    customer: { [x: string]: string };
    product: { [x: string]: string };
  }[],
) {
  let customers: Customer[] = [];
  resData.map(
    (customer: {
      customer: { [x: string]: string };
      product: { [x: string]: string };
    }) => {
      const { name, email } = customer.customer;
      const product = customer.product.name;
      const status: ("pending" | "sent")[] = ["pending", "sent"];
      customers.push({
        name,
        email,
        product: product,
        status: status[Math.floor(Math.random() * 2)],
      });
    },
  );
  return customers;
}

async function applyFilters(searchParams: { [x: string]: string }) {
  let data: Customer[] = [
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

  try {
    const queryString = searchParams["tab"]
      ? "?type=" + searchParams["tab"]
      : "";
    const res = await GetRequest("/customers" + queryString);
    if (res.data) {
      data = extractData(res.data);
    } else redirect("/");
  } catch (error) {
    console.log(error);
    redirect("/");
  }
  return data;
}
