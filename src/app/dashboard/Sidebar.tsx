"use client";
import "./Sidebar.css";
import { MdEditDocument } from "react-icons/md";
import { TbTableImport, TbLogout } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ThemeSwitch from "@/components/context/ThemeSwitch";
import { Logout } from "@/lib/requestHellpers/GetRequest";
import useAuth from "@/components/context/AuthProvider";

export default function Sidebar() {
  const path = usePathname();
  const { setAuth } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await Logout();
    setAuth(undefined);
    router.push("/");
  };

  return (
    <aside className="admin-sidebar">
      <div className="sidebar__header">
        <h1 className="sidebar__title">Email Sender</h1>
        <div className="hidden lg:inline-block">
          <ThemeSwitch />
        </div>
      </div>
      <nav className="sidebar__nav">
        <ul>
          <li className={(path === "/dashboard" && "active--nav-item") || ""}>
            <Link href="/dashboard" className="aside__nav-item">
              <TbTableImport className="nav-item__active" />{" "}
              <span>Data Editor</span>
            </Link>
          </li>
          <li
            className={
              (path === "/dashboard/template" && "active--nav-item") || ""
            }
          >
            <Link href="/dashboard/template" className="aside__nav-item">
              <MdEditDocument /> <span>Template Editor</span>
            </Link>
          </li>
          <li
            className={
              (path === "/dashboard/users" && "active--nav-item") || ""
            }
          >
            <Link href="/dashboard/users" className="aside__nav-item">
              <FaUsers /> <span>Users</span>
            </Link>
          </li>
          <li>
            <button
              type="button"
              onClick={handleLogout}
              className="aside__nav-item"
            >
              <TbLogout /> <span>Log out</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
