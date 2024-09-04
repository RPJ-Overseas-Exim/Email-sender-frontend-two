import GetRequest from "@/lib/requestHelpers/GetRequest";
import UserEditor from "./UserEditor";
import AddUser from "@/components/dashboard/userEditor/AddUser";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

export const dynamic = "force-dynamic";
export default async function page() {
  let data: [] | null = [];
  try {
    const res = await GetRequest("/users");
    if (res?.data) {
      data = res?.data;
    }
  } catch (error) {
    console.log(error);
    data = null;
  }

  return (
    <section id="users" className="mx-auto w-[96%]">
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-3">
          <Link href="/dashboard/settings">
            {<FaArrowLeftLong className="text-base" />}
          </Link>
          <h1 className="sidebar__title py-8" style={{ display: "block" }}>
            User Editor
          </h1>
        </div>

        <AddUser />
      </div>

      <UserEditor data={data} />
    </section>
  );
}
