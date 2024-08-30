import { Customer } from "@/lib/types/dataEditor/dataEditor";
import SelectTable from "./SelectTable";
import "./dataTable.css";
import GetRequest from "@/lib/requestHelpers/GetRequest";
import ThemeSwitch from "@/components/context/ThemeSwitch";
import ImportExport from "@/components/dashboard/dataEditor/ImportExport";
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
        <div className="flex items-center gap-2">
          <h1 className="sidebar__title py-8" style={{ display: "block" }}>
            Data Editor
          </h1>
          <div className="lg:hidden">
            <ThemeSwitch />
          </div>
        </div>
        <ImportExport data={data} />
      </div>
      <SelectTable data={data} count={Number(count)} />
    </section>
  );
}

function extractData(
  resData: { [x: string]: string }[],
  sentDateFilter: { startDate: string; endDate: string },
) {
  let customers: Customer[] = [];
  resData.map((customer: { [x: string]: string }) => {
    const { id, name, email, product, number } = customer;
    let { sentDate } = customer;

    let status;
    const sentDateString = new Date(sentDate).toLocaleDateString();
    const startDate = new Date(sentDateFilter.startDate).toLocaleDateString();
    const endDate = new Date(sentDateFilter.endDate).toLocaleDateString();
    const currDate = new Date().toLocaleDateString();
    (sentDateString >= startDate && sentDateString <= endDate) ||
    sentDateString === currDate
      ? (status = "sent")
      : (status = "pending");
    customers.push({
      id,
      name,
      email,
      productId: product,
      status: status === "sent" ? "sent" : "pending",
      number: number,
    });
  });
  return customers;
}

async function applyFilters(searchParams: { [x: string]: string }) {
  let data: Customer[];
  let count = 0;

  try {
    const queryString = new URLSearchParams(searchParams);
    let res;
    if (queryString.get("startDate") || queryString.get("endDate")) {
      res = await GetRequest("/stats?" + queryString.toString());
    } else res = await GetRequest("/customers?" + queryString.toString());
    if (res?.data && res?.count) {
      data = extractData(res.data, {
        endDate: searchParams["endDate"] ?? "",
        startDate: searchParams["startDate"] ?? "",
      });
      count = res.count;
      return { data, count };
    } else {
      return { data: [], count };
    }
  } catch (error) {
    console.log(error);
  }
  return { data: null, count };
}
