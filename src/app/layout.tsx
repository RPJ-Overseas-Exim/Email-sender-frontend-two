import type { Metadata } from "next";
import "./globals.css";
import CustomThemeProvider from "@/components/CustomThemeProvider";
import { OpenSans } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Email Sender",
  description: "Automate Sending Emails",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={OpenSans.className}>
        <CustomThemeProvider>{children}</CustomThemeProvider>
      </body>
    </html>
  );
}
