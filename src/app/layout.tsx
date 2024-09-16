import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/navbar/NavBar";
import MyThemeProvider from "@/components/ThemeProvider";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <MyThemeProvider>
          <NavBar />
          <main className="flex justify-center h-auto w-screen">
            {children}
          </main>
        </MyThemeProvider>
      </body>
    </html>
  );
}
