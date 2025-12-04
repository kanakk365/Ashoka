"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { MoreHorizontal } from "lucide-react";
import { ComingSoonModal } from "@/components/ComingSoonModal";

// Mock Data
const onboardedData = [
  { name: "Daily", value: 160, fill: "#009B9B" },
  { name: "Weekly", value: 420, fill: "#009C5B" },
  { name: "Monthly", value: 310, fill: "#666666" },
];

const trendData = [
  { name: "1.0", value: 6 },
  { name: "1.5", value: 8.5 },
  { name: "2.0", value: 7.2 },
  { name: "3.0", value: 7.8 },
  { name: "3.5", value: 8.5 },
  { name: "4.0", value: 7.8 },
  { name: "4.5", value: 8.2 },
  { name: "5.0", value: 10.5 },
  { name: "5.5", value: 11.5 },
  { name: "6.0", value: 12.2 },
  { name: "6.5", value: 14 },
];

const jobStatusData = [
  { name: "In progress", value: 30, color: "#009B9B" },
  { name: "Pending", value: 20, color: "#009C5B" },
  { name: "Completed", value: 40, color: "#00D1D1" },
  { name: "Delivered", value: 10, color: "#000000" },
];

const vehiclesData = [
  {
    id: "AD1245",
    reg: "MHA12321",
    brand: "Honda",
    branch: "Mumbai , Sp Road..",
    action: "View",
  },
  {
    id: "AD1245",
    reg: "MHA12321",
    brand: "Honda",
    branch: "Mumbai , Sp Road..",
    action: "View",
  },
];

export function VehicleOperations() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ComingSoonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="space-y-6">
        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Vehicles Onboarded */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-900">Vehicles Onboarded</h3>
              <select className="text-xs border-none bg-transparent font-medium text-gray-500 focus:ring-0 cursor-pointer">
                <option>Jan 2025</option>
              </select>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={onboardedData}
                  margin={{ top: 0, right: 30, left: 20, bottom: 0 }}
                  barSize={20}
                >
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#666" }}
                    width={60}
                  />
                  <Bar
                    dataKey="value"
                    radius={[0, 10, 10, 0] as any}
                    background={{ fill: "#eee", radius: [0, 10, 10, 0] as any }}
                  >
                    {onboardedData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between px-10 text-[10px] text-gray-400 mt-2">
              <span>0</span>
              <span>50</span>
              <span>100</span>
              <span>150</span>
              <span>200</span>
              <span>250</span>
              <span>300</span>
              <span>400</span>
            </div>
          </div>

          {/* Work completion trends */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-900">
                Work completion trends
              </h3>
              <select className="text-xs border-none bg-transparent font-medium text-gray-500 focus:ring-0 cursor-pointer">
                <option>Jan 2025</option>
              </select>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid
                    vertical={false}
                    stroke="#eee"
                    strokeDasharray="3 3"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#999" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#999" }}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#009B9B"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Table Row */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900">Vehicles table</h3>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-1.5 bg-gradient-to-r from-[#009B9B] to-[#009C5B] text-white text-sm rounded-lg hover:opacity-90 transition-opacity"
            >
              View all
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-3 rounded-l-lg">Vehicle ID</th>
                  <th className="px-6 py-3">Reg No</th>
                  <th className="px-6 py-3">Brand</th>
                  <th className="px-6 py-3">Branch</th>
                  <th className="px-6 py-3 rounded-r-lg text-right">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-50">
                {vehiclesData.map((vehicle, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {vehicle.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {vehicle.reg}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {vehicle.brand}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {vehicle.branch}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button 
                        onClick={() => setIsModalOpen(true)}
                        className="px-6 py-1.5 bg-gradient-to-r from-[#009B9B] to-[#009C5B] text-white text-xs rounded-full hover:opacity-90 transition-opacity"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Job status breakdown */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <h3 className="font-bold text-gray-900 mb-6">
              Job status breakdown
            </h3>
            <div className="flex items-center justify-center gap-8 flex-1">
              <div className="relative w-48 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={jobStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={0}
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                    >
                      {jobStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-bold text-gray-900">123</span>
                  <span className="text-xs text-gray-500">Jobs</span>
                </div>
              </div>
              <div className="space-y-3">
                {jobStatusData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Due Date / Delivery Date */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex gap-6 border-b border-gray-100 mb-6">
              <button className="pb-2 text-sm font-bold text-gray-900 border-b-2 border-[#009C5B]">
                Due Date
              </button>
              <button className="pb-2 text-sm font-medium text-gray-400 hover:text-gray-600">
                Delivery Date
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-gray-100 rounded-lg">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                  <span>Due Today</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">18</div>
              </div>
              <div className="p-4 border border-gray-100 rounded-lg">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                  <span>Due Tomorrow</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">12</div>
              </div>
              <div className="p-4 border border-gray-100 rounded-lg">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                  <span>This Week</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">47</div>
              </div>
              <div className="p-4 border border-gray-100 rounded-lg">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                  <span>Overdue</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-900">12</span>
                  <span className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded">
                    11.5% ↗
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
