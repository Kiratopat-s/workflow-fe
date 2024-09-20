"use client";
import { ThemeProvider } from "next-themes";

function MyThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}

export default MyThemeProvider;
