import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { PWAInit } from "@/components/PWAInit";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pesantren Exam Pro",
  description: "Platform CBT Modern untuk Pondok Pesantren",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "ExamPro" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#059669" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <PWAInit />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
