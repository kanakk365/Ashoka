import React from "react";
import { ArrowUpRight, ArrowDownRight, LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon?: LucideIcon;
}

export function StatCard({
  title,
  value,
  trend,
  trendUp,
  icon: Icon,
}: StatCardProps) {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-3 text-gray-500">
        {Icon && <Icon size={16} />}
        <span className="text-sm font-medium">{title}</span>
      </div>
      <div className="flex items-end gap-3">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        <div
          className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium ${
            trendUp ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
          }`}
        >
          {trend}
          {trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
        </div>
      </div>
    </div>
  );
}
