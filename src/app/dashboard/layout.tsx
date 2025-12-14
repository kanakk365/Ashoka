"use client";

import React, { Suspense } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { AuthGuard } from "@/components/AuthGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        <Suspense
          fallback={
            <div className="w-64 h-screen bg-white border-r border-gray-100 fixed left-0 top-0 z-20" />
          }
        >
          <Sidebar />
        </Suspense>
        <Navbar />
        <main className="ml-64 pt-16 h-screen flex flex-col p-8 bg-gray-50 overflow-y-auto">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
