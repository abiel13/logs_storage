import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/searchbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LogAI",
  description: `LogAI is an advanced log storage and retrieval system that efficiently manages logs while providing intelligent responses to user queries. It stores and organizes logs in a structured format, allowing users to search and retrieve relevant information instantly.

When a query is made, LogAI first searches the stored logs for an answer. If the requested information is not found, it leverages AI to analyze patterns, infer insights, or generate relevant responses based on contextual understanding. This ensures that users always receive meaningful answers, even when explicit information is not available.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen text-slate-100 relative overflow-x-hidden`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.08),transparent_55%)]" />
        <div className="relative z-10 flex flex-col lg:flex-row gap-6 w-full max-w-7xl mx-auto px-4 py-6 lg:py-10">
          <Sidebar />
          <main className="glass-panel flex-1 rounded-[32px] px-5 py-6 md:px-10 md:py-10 flex flex-col gap-10 overflow-hidden">
            <SearchBar />
            <section className="flex-1 w-full overflow-y-auto pr-1">{children}</section>
          </main>
        </div>
      </body>
    </html>
  );
}
