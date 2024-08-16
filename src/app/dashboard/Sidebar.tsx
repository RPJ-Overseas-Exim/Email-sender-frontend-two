"use client";
import "./Sidebar.css";
import { MdEditDocument } from "react-icons/md";
import { TbTableImport } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitch from "@/components/context/ThemeSwitch";

export default function Sidebar() {
  const path = usePathname();
  return (
    <aside className="admin-sidebar">
      <div className="sidebar__header">
        <h1 className="sidebar__title">Email Sender</h1>
        <ThemeSwitch />
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
        </ul>
      </nav>
    </aside>
  );
}
