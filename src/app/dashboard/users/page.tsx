import GetRequest from "@/lib/requestHelpers/GetRequest";
import UserEditor from "./UserEditor";
import AddUser from "@/components/dashboard/userEditor/AddUser";
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
        <h1 className="sidebar__title py-8" style={{ display: "block" }}>
          User Editor
        </h1>
        <AddUser />
      </div>

      <UserEditor data={data} />
    </section>
  );
}
