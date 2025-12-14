"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import {
  LayoutDashboard,
  Tags,
  MapPin,
  Car,
  Users,
  Briefcase,
  BarChart3,
  ChevronRight,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    id: "dashboard",
  },
  {
    name: "Brands",
    icon: Tags,
    href: "/dashboard/coming-soon?from=brands",
    id: "brands",
  },
  {
    name: "Branches",
    icon: MapPin,
    href: "/dashboard/branches",
    id: "branches",
  },
  {
    name: "Vehicles",
    icon: Car,
    href: "/dashboard/coming-soon?from=vehicles",
    id: "vehicles",
  },
  {
    name: "Employees",
    icon: Users,
    href: "/dashboard/coming-soon?from=employees",
    id: "employees",
  },
  {
    name: "Operations / Jobs",
    icon: Briefcase,
    href: "/dashboard/coming-soon?from=operations",
    id: "operations",
  },
  {
    name: "Reports",
    icon: BarChart3,
    href: "/dashboard/coming-soon?from=reports",
    id: "reports",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const fromParam = searchParams.get("from");
  const [showLogout, setShowLogout] = useState(false);
  const { logout } = useAuthStore();

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0 z-20">
      <div className="p-8">
        <div className="relative w-40 h-12">
          <img
            src="/logo.png"
            alt="Logo"
            className="object-contain w-full h-full"
          />
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (pathname.startsWith(item.href) && item.href !== "/dashboard") ||
            (pathname === "/dashboard/coming-soon" && fromParam === item.id);
          return (
            <Link
              key={item.name}
              href={item.href}
              style={
                isActive
                  ? {
                    background:
                      "linear-gradient(92.57deg, #E33424 -11.84%, #C00F00 100.76%)",
                  }
                  : undefined
              }
              className={` cursor-pointer flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${isActive
                ? "text-white"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="relative p-4 border-t border-gray-100">
        {showLogout && (
          <div className="absolute bottom-full left-4 right-4 mb-2 bg-white rounded-xl shadow-lg border border-gray-100 p-2 animate-in slide-in-from-bottom-2">
            <button
              onClick={() => logout()}
              className="w-full flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              <span className="font-medium text-sm">Log Out</span>
            </button>
          </div>
        )}
        <div
          onClick={() => setShowLogout(!showLogout)}
          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
        >
          <div className="w-10 h-10 rounded bg-[#E33424] flex items-center justify-center text-white font-bold">
            K
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-400">Welcome 👋</p>
            <p className="text-sm font-bold text-gray-900">Ashoka</p>
          </div>
          <ChevronRight
            size={16}
            className={`text-gray-400 transition-transform ${showLogout ? "rotate-90" : ""}`}
          />
        </div>
      </div>
    </div>
  );
}
