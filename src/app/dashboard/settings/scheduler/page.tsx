import GetRequest from "@/lib/requestHelpers/GetRequest";
import { Scheduler } from "@/lib/types/Scheduler";
import CustomerTable from "@/components/dashboard/data-table";
import { columns } from "@/components/dashboard/scheduler/columns";
import Spinner from "@/components/ui/Spinner";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

export const dynamic = "force-dynamic";
export default async function page() {
  let schedule: Scheduler[] | null = null;
  try {
    const res = await GetRequest("/schedule");
    let resAllProducts = await GetRequest("/products");
    if (res?.data && resAllProducts?.data) {
      resAllProducts = resAllProducts.data.map(
        (product: { [x: string]: string }) => product.name,
      );
      schedule = res.data.map(
        (schedule: { [x: string]: string | { [y: string]: string } }) => {
          return { ...schedule, allProducts: resAllProducts };
        },
      );
    } else if (res?.error) {
      console.log(res.error);
    }
  } catch (error) {
    console.log(error);
  }
  return (
    <section id="data-editor" className="data-editor mx-auto w-[96%]">
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-3">
          <Link href="/dashboard/settings">
            {<FaArrowLeftLong className="text-base" />}
          </Link>
          <h1 className="sidebar__title py-8" style={{ display: "block" }}>
            Scheduler
          </h1>
        </div>
      </div>

      <div className="h-[calc(100dvh-94px)] overflow-auto">
        {schedule ? (
          <div className="w-full">
            <CustomerTable data={schedule} columns={columns} />
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <Spinner />
          </div>
        )}
      </div>
    </section>
  );
}
