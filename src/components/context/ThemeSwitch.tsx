"use client";
import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="text-base lg:text-lg">
      {theme === "light" ? (
        <FaSun onClick={() => setTheme("dark")} />
      ) : (
        <FaMoon onClick={() => setTheme("light")} />
      )}
    </div>
  );
}
