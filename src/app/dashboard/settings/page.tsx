import Link from "next/link";
import { FaUsers } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import DeleteDialog from "@/components/dashboard/settings/deleteDialog"

export default function page() {
    return (
        <section id="settings" className="mx-auto w-[96%]">
            <div className="flex items-center justify-between">
                <h1 className="sidebar__title py-8" style={{ display: "block" }}>
                    Settings
                </h1>
            </div>

            <nav aria-labelledby="settings navigation">
                <ul className="space-y-2">
                    <li>
                        <Link
                            href="/dashboard/settings/users"
                            className="flex items-center gap-2 border border-border px-4 py-2 font-bold hover:bg-border"
                        >
                            <FaUsers className="text-lg" /> Users
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/dashboard/settings/scheduler"
                            className="flex items-center gap-2 border border-border px-4 py-2 font-bold hover:bg-border"
                        >
                            <FaClock className="text-lg" /> Scheduler
                        </Link>
                    </li>
                </ul>

                <h2 className="text-red-600 text-lg font-bold py-4">Danger Zone</h2>
                <ul className="space-y-2">
                    <li>
                        <DeleteDialog type="enquiry"/>
                    </li>
                    <li>
                        <DeleteDialog type="reorder"/>
                    </li>
                </ul>

            </nav>
        </section>
    );
}
