"use client";

import React from "react";
import { Search, Bell } from "lucide-react";

export function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-end px-8 fixed top-0 right-0 left-64 z-10">
      <div className="flex items-center gap-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E33424]/20 w-64"
          />
        </div>

        <button className="relative p-2 hover:bg-gray-50 rounded-full transition-colors">
          <Bell size={20} className="text-gray-500" />
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center border-2 border-white">
            3
          </span>
        </button>

        <div className="w-8 h-8 rounded bg-[#E33424] flex items-center justify-center text-white text-sm font-bold">
          K
        </div>
      </div>
    </header>
  );
}
