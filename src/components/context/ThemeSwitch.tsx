"use client";
import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  return (
    <>
      {theme === "light" ? (
        <FaSun size={20} onClick={() => setTheme("dark")} />
      ) : (
        <FaMoon size={20} onClick={() => setTheme("light")} />
      )}
    </>
  );
}
