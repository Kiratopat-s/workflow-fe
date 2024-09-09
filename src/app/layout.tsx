import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/navbar/NavBar";

export const metadata: Metadata = {
  title: "Workflow PEA",
  description: "Developed by Kiratipat.S DEVPOOL-PEA-2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="light" lang="en">
      <body>
        <NavBar />
        <main className="flex justify-center h-auto w-screen">{children}</main>
      </body>
    </html>
  );
}
