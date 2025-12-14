"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBranchStore } from "@/store/branchStore";
import { AddBranchModal } from "@/components/dashboard/AddBranchModal";
import {
    Plus,
    Filter,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

export default function BranchesPage() {
    const router = useRouter();
    const { branches, isLoading, error, fetchBranches } = useBranchStore();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        fetchBranches();
    }, [fetchBranches]);

    // Mock data for missing fields
    const getStaffCount = () => Math.floor(Math.random() * 100) + 10;
    const getStatus = () => "Active";

    return (
        <div className="h-full flex flex-col gap-6 py-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Branches List</h1>
                    <p className="text-gray-500 mt-1 italic">
                        Manage all Branches registered in the system.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => router.push("/dashboard/branches/add")}
                        className="flex items-center gap-2 px-6 py-2.5 text-white rounded-lg transition-colors cursor-pointer hover:opacity-90 font-medium"
                        style={{
                            background: "linear-gradient(92.57deg, #E33424 -11.84%, #C00F00 100.76%)",
                        }}
                    >
                        <Plus size={20} />
                        Add New Branch
                    </button>
                    <button
                        className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors font-medium shadow-sm"
                    >
                        <Filter size={18} />
                        Filters
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex-1 overflow-hidden flex flex-col p-6">
                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-4 shrink-0 rounded">
                        <p>{error}</p>
                    </div>
                )}

                {/* Loading State */}
                {isLoading && branches.length === 0 ? (
                    <div className="flex items-center justify-center p-12 flex-1">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E33424]"></div>
                    </div>
                ) : (
                    <div className="overflow-auto flex-1">
                        <table className="w-full text-left" style={{ borderCollapse: 'separate', borderSpacing: '0' }}>
                            <thead className="text-gray-800">
                                <tr>
                                    <th className="bg-[#F4F4F4] px-8 py-5 font-medium text-sm whitespace-nowrap rounded-l-lg">Branch Name</th>
                                    <th className="bg-[#F4F4F4] px-8 py-5 font-medium text-sm whitespace-nowrap">Contact Number</th>
                                    <th className="bg-[#F4F4F4] px-8 py-5 font-medium text-sm whitespace-nowrap">Total Staff</th>
                                    <th className="bg-[#F4F4F4] px-8 py-5 font-medium text-sm whitespace-nowrap">Status</th>
                                    <th className="bg-[#F4F4F4] px-8 py-5 font-medium text-sm whitespace-nowrap text-right pr-12 rounded-r-lg">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {branches.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-12 text-center text-gray-500">
                                            No branches found. Add a new branch to get started.
                                        </td>
                                    </tr>
                                ) : (
                                    branches.map((branch) => (
                                        <tr key={branch.id} className="hover:bg-gray-50 transition-colors group">
                                            <td className="px-8 py-6 text-gray-600 font-medium border-b border-gray-50 group-last:border-0">
                                                {branch.name} {branch.location ? `– ${branch.location}` : ""}
                                            </td>
                                            <td className="px-8 py-6 text-gray-600 border-b border-gray-50 group-last:border-0">
                                                {branch.phoneNumber}
                                            </td>
                                            <td className="px-8 py-6 text-gray-600 border-b border-gray-50 group-last:border-0">
                                                {/* Use a consistent random number or placeholder since field is missing */}
                                                {(branch.id * 12) % 150 + 10}
                                            </td>
                                            <td className="px-8 py-6 text-gray-600 border-b border-gray-50 group-last:border-0">
                                                {getStatus()}
                                            </td>
                                            <td className="px-8 py-6 text-right border-b border-gray-50 group-last:border-0">
                                                <button
                                                    onClick={() => router.push(`/dashboard/branches/${branch.id}`)}
                                                    className="px-8 cursor-pointer py-2 text-white text-sm font-medium rounded-full hover:opacity-90 transition-opacity"
                                                    style={{ background: "linear-gradient(92.57deg, #E33424 -11.84%, #C00F00 100.76%)" }}
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Footer / Pagination */}
            <div className="shrink-0 h-10 flex items-center justify-between px-2">
                {!isLoading && branches.length > 0 && (
                    <div className="flex items-center justify-between text-sm text-gray-500 w-full">
                        <p>Showing 01 of {branches.length < 10 ? `0${branches.length}` : branches.length}</p>
                        <div className="flex gap-2">
                            <button className="w-8 h-8 flex items-center justify-center rounded bg-[#E33424] text-white hover:opacity-90 transition-opacity">
                                <ChevronLeft size={16} />
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center rounded bg-[#E33424] text-white hover:opacity-90 transition-opacity">
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Add Branch Modal */}
            <AddBranchModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />
        </div>
    );
}
