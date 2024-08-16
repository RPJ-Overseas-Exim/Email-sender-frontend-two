import type { Metadata } from "next";
import "./globals.css";
import CustomThemeProvider from "@/components/context/CustomThemeProvider";
import { OpenSans } from "@/lib/fonts";
import { AuthProvider } from "@/components/context/AuthProvider";

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
        <AuthProvider>
          <CustomThemeProvider>{children}</CustomThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
