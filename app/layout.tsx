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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#31916c] px-4 py-4 relative flex gap-2 `}
      >
        <Sidebar />
        <main className="bg-white h-[96vh] overflow-y-auto flex-1 rounded-2xl flex flex-col gap-8 items-center p-4">
          <SearchBar />
             {children} 
        </main>
    
      </body>
    </html>
  );
}
