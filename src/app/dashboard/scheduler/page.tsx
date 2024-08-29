import GetRequest from "@/lib/requestHelpers/GetRequest";
import { Scheduler } from "@/lib/types/Scheduler";
import CustomerTable from "@/components/dashboard/data-table";
import { columns } from "@/components/dashboard/scheduler/columns";
import Spinner from "@/components/ui/Spinner";

export default async function page() {
  let schedule: Scheduler[] | null = null;
  try {
    const res = await GetRequest("/schedule");
    if (res?.data) {
      schedule = res.data;
    } else if (res?.error) {
      console.log(res.error);
    }
  } catch (error) {
    console.log(error);
  }
  return (
    <section id="data-editor" className="data-editor mx-auto w-[96%]">
      <div className="flex items-center justify-between">
        <h1 className="sidebar__title py-8" style={{ display: "block" }}>
          Scheduler
        </h1>
      </div>

      <div className="h-[calc(100dvh-94px)] w-[96%] overflow-auto">
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
