import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/navbar/NavBar";
import MyThemeProvider from "@/components/ThemeProvider";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";

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
      <AuthProvider>
        <body>
          <MyThemeProvider>
            <Toaster
              toastOptions={{
                // Define default options
                className: "",
                duration: 5000,
                style: {
                  background: "#363636",
                  color: "#fff",
                },

                // Default options for specific types
                success: {
                  duration: 4000,
                },
              }}
            />
            <NavBar />
            <main className="flex justify-center h-auto w-screen">
              {children}
            </main>
          </MyThemeProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
