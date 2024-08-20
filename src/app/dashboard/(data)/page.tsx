import { Customer } from "@/lib/types/dataEditor/dataEditor";
import SelectTable from "./SelectTable";
import "./dataTable.css";
import GetRequest, { Logout } from "@/lib/requestHellpers/GetRequest";
import { redirect } from "next/navigation";
import ImportCSV from "@/components/dashboard/dataEditor/ImportCSV";
export const dynamic = "auto";
export default async function DataEditor({
  searchParams,
}: {
  searchParams: { [x: string]: string };
}) {
  const { data, count } = await applyFilters(searchParams);
  return (
    <section id="data-editor" className="data-editor mx-auto w-[96%]">
      <div className="flex items-center justify-between">
        <h1 className="sidebar__title py-8" style={{ display: "block" }}>
          Data Editor
        </h1>

        <ImportCSV />
      </div>
      <SelectTable data={data} count={Number(count)} />
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
      const { id, name, email } = customer.customer;
      const product = customer.product.name;
      const status: ("pending" | "sent")[] = ["pending", "sent"];
      customers.push({
        id,
        name,
        email,
        productId: product,
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
      productId: "Zolpidem",
      status: "pending",
    },
  ];
  let count = 0;

  try {
    const queryString = new URLSearchParams(searchParams);

    const res = await GetRequest("/customers?" + queryString.toString());
    if (res.data && res.count) {
      data = extractData(res.data);
      count = res.count;
    } else {
      redirect("/");
    }
  } catch (error) {
    console.log(error);
    redirect("/");
  }
  return { data, count };
}
