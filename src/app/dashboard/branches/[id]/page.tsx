"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useBranchStore } from "@/store/branchStore";
import {
    ChevronLeft,
    Car,
    Users,
    ClipboardList,
    CheckCircle2,
    Loader2,
    Building2,
    Briefcase
} from "lucide-react";

export default function BranchDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { selectedBranch, isFetchingDetails, error, fetchBranchById } =
        useBranchStore();

    const branchId = params.id ? parseInt(params.id as string, 10) : null;

    useEffect(() => {
        if (branchId) {
            fetchBranchById(branchId);
        }
    }, [branchId, fetchBranchById]);

    if (isFetchingDetails) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 size={48} className="animate-spin text-[#E33424]" />
                    <p className="text-gray-500">Loading branch details...</p>
                </div>
            </div>
        );
    }

    if (error || !selectedBranch) {
        return (
            <div className="space-y-6 py-4">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <ChevronLeft size={20} />
                    Back to Branches
                </button>
                <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
                    <p className="font-medium">Error loading branch</p>
                    <p className="text-sm mt-1">{error || "Branch not found"}</p>
                </div>
            </div>
        );
    }

    // Mock Values (since these are not in the Branch API)
    const stats = [
        { label: "Total Staff", value: "134", icon: Users },
        { label: "Vehicles Assigned", value: "234", icon: Car },
        { label: "Jobs in Progress", value: "5", icon: Briefcase },
        { label: "Completed Today", value: "3", icon: ClipboardList }, // Using ClipboardList as approximation for checklist
    ];

    const openingTime = "9:00 AM";
    const closingTime = "7:00 PM";
    const status = "Active";

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-900 font-medium text-lg hover:opacity-80 transition-opacity mb-1"
                >
                    <ChevronLeft size={24} />
                    {selectedBranch.name}
                </button>
                <p className="text-gray-500 text-sm ml-8 italic">
                    View full details about the branch here
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between h-32">
                        <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
                            <stat.icon size={14} />
                            {stat.label}
                        </div>
                        <div className="text-3xl font-semibold text-gray-900">
                            {stat.value}
                        </div>
                    </div>
                ))}
            </div>

            {/* Branch Details Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-8 py-5 border-b border-gray-100">
                    <h2 className="text-lg font-medium text-gray-900">Branch Details</h2>
                </div>

                <div className="p-8 space-y-8">
                    {/* Grid Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-12">
                        <div className="space-y-1">
                            <p className="text-xs text-gray-400 font-medium">Branch Name:</p>
                            <p className="text-gray-900 font-medium text-base">
                                {selectedBranch.name.split('–')[1]?.trim() || selectedBranch.name.split('-')[1]?.trim() || selectedBranch.name}
                                {/* Robust splitting to get the "Mettuguda" part if name is "Ashoka Yamaha - Mettuguda" */}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-gray-400 font-medium">Contact number:</p>
                            <p className="text-gray-900 font-medium text-base">
                                {selectedBranch.phoneNumber}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-gray-400 font-medium">Manager Name:</p>
                            <p className="text-gray-900 font-medium text-base">
                                {selectedBranch.branchManagerName}
                            </p>
                        </div>

                        <div className="space-y-1">
                            <p className="text-xs text-gray-400 font-medium">Opening Time:</p>
                            <p className="text-gray-900 font-medium text-base">
                                {openingTime}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-gray-400 font-medium">Closing Time:</p>
                            <p className="text-gray-900 font-medium text-base">
                                {closingTime}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-gray-400 font-medium">Status:</p>
                            <p className="text-gray-900 font-medium text-base">
                                {status}
                            </p>
                        </div>
                    </div>

                    {/* Address - Full width */}
                    <div className="space-y-1">
                        <p className="text-xs text-gray-400 font-medium">Address:</p>
                        <p className="text-gray-900 font-medium text-base">
                            {selectedBranch.location}
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer Action */}
            <div className="flex justify-end pt-4">
                <button className="px-6 py-2.5 bg-[#D34059] text-white font-medium rounded-lg hover:bg-[#b03045] transition-colors shadow-sm text-sm">
                    Delete Brand
                </button>
            </div>
        </div>
    );
}
