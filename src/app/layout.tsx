import type { Metadata } from "next";
import "./globals.css";
import { OpenSans } from "@/lib/fonts";
import Providers from "./Providers";

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
