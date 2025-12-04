"use client";

import React, { useState } from "react";
import { StatCard } from "@/components/dashboard/StatCard";
import { VehicleOperations } from "@/components/dashboard/VehicleOperations";
import {
  FileText,
  Truck,
  Users,
  CheckCircle,
  Clock,
  ArrowRightLeft,
  AlertCircle,
  Star,
} from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "₹989k",
    trend: "28.4%",
    trendUp: true,
    icon: FileText,
  },
  {
    title: "Vehicles Onboarded",
    value: "1,243",
    trend: "12.6%",
    trendUp: false,
    icon: Truck,
  },
  {
    title: "Vehicles Assigned",
    value: "1,872",
    trend: "3.1%",
    trendUp: true,
    icon: Users,
  },
  {
    title: "Work Completed",
    value: "762",
    trend: "11.3%",
    trendUp: true,
    icon: CheckCircle,
  },
  {
    title: "Vehicles Delivered",
    value: "457",
    trend: "28.4%",
    trendUp: true,
    icon: Truck,
  },
  {
    title: "Vehicles Sold / Purchased",
    value: "1,343/786",
    trend: "12.6%",
    trendUp: false,
    icon: ArrowRightLeft,
  },
  {
    title: "Overdue Jobs",
    value: "194",
    trend: "3.1%",
    trendUp: true,
    icon: AlertCircle,
  },
  {
    title: "Avg Customer Rating (CSAT)",
    value: "87%",
    trend: "11.3%",
    trendUp: true,
    icon: Star,
  },
];

const tabs = [
  "Vehicle Operations",
  "Staff Performance",
  "Revenue & Sales",
  "Customer Metrics",
  "Branch Performance",
  "Notification",
  "Reports",
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("Vehicle Operations");

  return (
    <div className="space-y-8 py-4 ">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="flex bg-gray-200 p-1 rounded-full text-xs font-medium">
          <button className="px-4 py-1 bg-gradient-to-r from-[#009B9B] to-[#009C5B] text-white rounded-full shadow-sm">
            Today
          </button>
          <button className="px-4 py-1 text-gray-600 hover:text-gray-900">
            Total
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${
                  activeTab === tab
                    ? "border-[#009C5B] text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === "Vehicle Operations" ? (
          <VehicleOperations />
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-400 bg-white rounded-xl border border-gray-100">
            Content for {activeTab}
          </div>
        )}
      </div>
    </div>
  );
}
