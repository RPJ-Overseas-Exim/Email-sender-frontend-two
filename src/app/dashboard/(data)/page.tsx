import { Customer } from "@/lib/types/dataEditor/dataEditor";
import SelectTable from "./SelectTable";
import "./dataTable.css";
import GetRequest from "@/lib/requestHellpers/GetRequest";
import ImportCSV from "@/components/dashboard/dataEditor/ImportCSV";
export const dynamic = "force-dynamic";
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

function extractData(resData: { [x: string]: string }[]) {
  let customers: Customer[] = [];
  resData.map((customer: { [x: string]: string }) => {
    const { id, name, email, product, status } = customer;
    customers.push({
      id,
      name,
      email,
      productId: product,
      status: status ? "sent" : "pending",
    });
  });
  return customers;
}

async function applyFilters(searchParams: { [x: string]: string }) {
  let data: Customer[];
  let count = 0;

  try {
    const queryString = new URLSearchParams(searchParams);

    const res = await GetRequest("/customers?" + queryString.toString());
    if (res?.data && res?.count) {
      data = extractData(res.data);
      count = res.count;
      return { data, count };
    }
  } catch (error) {
    console.log(error);
  }
  return { data: null, count };
}
