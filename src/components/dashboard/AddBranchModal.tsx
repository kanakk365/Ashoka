"use client";

import React, { useState, useRef } from "react";
import { X, Upload, Loader2, MapPin } from "lucide-react";
import { useBranchStore, CreateBranchData } from "@/store/branchStore";

interface AddBranchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AddBranchModal({ isOpen, onClose }: AddBranchModalProps) {
    const { createBranch, isCreating } = useBranchStore();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState<CreateBranchData>({
        name: "",
        location: "",
        latitude: 0,
        longitude: 0,
        email: "",
        phoneNumber: "",
        branchManagerName: "",
        branchManagerPhone: "",
        files: [],
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = "Branch name is required";
        }
        if (!formData.location.trim()) {
            newErrors.location = "Location is required";
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = "Phone number is required";
        } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = "Phone number must be 10 digits";
        }
        if (!formData.branchManagerName.trim()) {
            newErrors.branchManagerName = "Manager name is required";
        }
        if (!formData.branchManagerPhone.trim()) {
            newErrors.branchManagerPhone = "Manager phone is required";
        } else if (!/^\d{10}$/.test(formData.branchManagerPhone)) {
            newErrors.branchManagerPhone = "Phone number must be 10 digits";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setSelectedFiles((prev) => [...prev, ...files]);
            setFormData((prev) => ({ ...prev, files: [...(prev.files || []), ...files] }));
        }
    };

    const removeFile = (index: number) => {
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
        setFormData((prev) => ({
            ...prev,
            files: prev.files?.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        const success = await createBranch({
            ...formData,
            latitude: formData.latitude || 0,
            longitude: formData.longitude || 0,
        });

        if (success) {
            handleClose();
        }
    };

    const handleClose = () => {
        setFormData({
            name: "",
            location: "",
            latitude: 0,
            longitude: 0,
            email: "",
            phoneNumber: "",
            branchManagerName: "",
            branchManagerPhone: "",
            files: [],
        });
        setSelectedFiles([]);
        setErrors({});
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div
                    className="px-6 py-4 flex items-center justify-between"
                    style={{
                        background:
                            "linear-gradient(92.57deg, #009B9B -11.84%, #009C5B 100.76%)",
                    }}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                            <MapPin size={22} className="text-white" />
                        </div>
                        <h2 className="text-xl font-semibold text-white">Add New Branch</h2>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-white/80 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                    <div className="space-y-6">
                        {/* Branch Information */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-4">
                                Branch Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Branch Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter branch name"
                                        className={`w-full px-4 py-2.5 rounded-lg border ${errors.name ? "border-red-500" : "border-gray-200"
                                            } focus:outline-none focus:ring-2 focus:ring-[#009C5B] focus:border-transparent text-black`}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Location <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        placeholder="Enter location"
                                        className={`w-full px-4 py-2.5 rounded-lg border ${errors.location ? "border-red-500" : "border-gray-200"
                                            } focus:outline-none focus:ring-2 focus:ring-[#009C5B] focus:border-transparent text-black`}
                                    />
                                    {errors.location && (
                                        <p className="text-red-500 text-xs mt-1">{errors.location}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Latitude
                                    </label>
                                    <input
                                        type="number"
                                        name="latitude"
                                        value={formData.latitude || ""}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                latitude: parseFloat(e.target.value) || 0,
                                            }))
                                        }
                                        placeholder="Enter latitude"
                                        step="any"
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009C5B] focus:border-transparent text-black"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Longitude
                                    </label>
                                    <input
                                        type="number"
                                        name="longitude"
                                        value={formData.longitude || ""}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                longitude: parseFloat(e.target.value) || 0,
                                            }))
                                        }
                                        placeholder="Enter longitude"
                                        step="any"
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009C5B] focus:border-transparent text-black"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-4">
                                Contact Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter email address"
                                        className={`w-full px-4 py-2.5 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-200"
                                            } focus:outline-none focus:ring-2 focus:ring-[#009C5B] focus:border-transparent text-black`}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        placeholder="Enter phone number"
                                        maxLength={10}
                                        className={`w-full px-4 py-2.5 rounded-lg border ${errors.phoneNumber ? "border-red-500" : "border-gray-200"
                                            } focus:outline-none focus:ring-2 focus:ring-[#009C5B] focus:border-transparent text-black`}
                                    />
                                    {errors.phoneNumber && (
                                        <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Branch Manager */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-4">
                                Branch Manager
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Manager Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="branchManagerName"
                                        value={formData.branchManagerName}
                                        onChange={handleInputChange}
                                        placeholder="Enter manager name"
                                        className={`w-full px-4 py-2.5 rounded-lg border ${errors.branchManagerName ? "border-red-500" : "border-gray-200"
                                            } focus:outline-none focus:ring-2 focus:ring-[#009C5B] focus:border-transparent text-black`}
                                    />
                                    {errors.branchManagerName && (
                                        <p className="text-red-500 text-xs mt-1">{errors.branchManagerName}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Manager Phone <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="branchManagerPhone"
                                        value={formData.branchManagerPhone}
                                        onChange={handleInputChange}
                                        placeholder="Enter manager phone"
                                        maxLength={10}
                                        className={`w-full px-4 py-2.5 rounded-lg border ${errors.branchManagerPhone ? "border-red-500" : "border-gray-200"
                                            } focus:outline-none focus:ring-2 focus:ring-[#009C5B] focus:border-transparent text-black`}
                                    />
                                    {errors.branchManagerPhone && (
                                        <p className="text-red-500 text-xs mt-1">{errors.branchManagerPhone}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Documents Upload */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-4">
                                Documents (Optional)
                            </h3>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:border-[#009C5B] transition-colors"
                            >
                                <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                                <p className="text-gray-600 text-sm">
                                    Click to upload or drag and drop
                                </p>
                                <p className="text-gray-400 text-xs mt-1">
                                    PNG, JPG, PDF up to 10MB
                                </p>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    accept="image/*,.pdf"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </div>

                            {/* Selected Files */}
                            {selectedFiles.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    {selectedFiles.map((file, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg"
                                        >
                                            <span className="text-sm text-gray-700 truncate flex-1">
                                                {file.name}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => removeFile(index)}
                                                className="text-red-500 hover:text-red-700 ml-2"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={isCreating}
                            className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isCreating}
                            className="px-6 py-2.5 text-white rounded-lg transition-colors disabled:opacity-70 flex items-center gap-2"
                            style={{
                                background:
                                    "linear-gradient(92.57deg, #009B9B -11.84%, #009C5B 100.76%)",
                            }}
                        >
                            {isCreating ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                "Create Branch"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
