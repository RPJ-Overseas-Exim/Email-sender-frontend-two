"use client";
import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeSwitch() {
  const { setTheme } = useTheme();
  return (
    <div className="text-base lg:text-lg">
        <FaSun className="dark:hidden" onClick={() => setTheme("dark")} />
        <FaMoon className="hidden dark:inline-block" onClick={() => setTheme("light")} />
    </div>
  );
}
