"use client";
import { ThemeProvider, useTheme } from "next-themes";
import { useEffect } from "react";

export default function CustomThemeProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setTheme((localStorage.getItem("theme") as string) || "system");
  }, []);
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
      {children}
    </ThemeProvider>
  );
}
