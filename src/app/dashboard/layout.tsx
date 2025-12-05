import React, { Suspense } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Suspense
        fallback={
          <div className="w-64 h-screen bg-white border-r border-gray-100 fixed left-0 top-0 z-20" />
        }
      >
        <Sidebar />
      </Suspense>
      <Navbar />
      <main className="ml-64 pt-16 p-8 bg-white">{children}</main>
    </div>
  );
}
