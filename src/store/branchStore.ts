import { create } from "zustand";
import api from "@/lib/api";

export interface Branch {
  id: number;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  email: string;
  phoneNumber: string;
  branchManagerName: string;
  branchManagerPhone: string;
  branchDocuments: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateBranchData {
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  email: string;
  phoneNumber: string;
  branchManagerName: string;
  branchManagerPhone: string;
  files?: File[];
}

interface BranchState {
  branches: Branch[];
  selectedBranch: Branch | null;
  isLoading: boolean;
  isCreating: boolean;
  isFetchingDetails: boolean;
  error: string | null;

  // Actions
  fetchBranches: () => Promise<void>;
  fetchBranchById: (id: number) => Promise<Branch | null>;
  createBranch: (data: CreateBranchData) => Promise<boolean>;
  getBranchById: (id: number) => Branch | undefined;
  setSelectedBranch: (branch: Branch | null) => void;
  clearError: () => void;
}

export const useBranchStore = create<BranchState>((set, get) => ({
  branches: [],
  selectedBranch: null,
  isLoading: false,
  isCreating: false,
  isFetchingDetails: false,
  error: null,

  fetchBranches: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.get<Branch[]>("/branch");
      set({
        branches: response.data,
        isLoading: false,
        error: null,
      });
    } catch (error: unknown) {
      let errorMessage = "Failed to fetch branches. Please try again.";

      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }

      set({
        isLoading: false,
        error: errorMessage,
      });
    }
  },

  fetchBranchById: async (id: number) => {
    set({ isFetchingDetails: true, error: null });

    try {
      const response = await api.get<Branch>(`/branch/${id}`);
      set({
        selectedBranch: response.data,
        isFetchingDetails: false,
        error: null,
      });
      return response.data;
    } catch (error: unknown) {
      let errorMessage = "Failed to fetch branch details. Please try again.";

      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }

      set({
        isFetchingDetails: false,
        error: errorMessage,
        selectedBranch: null,
      });
      return null;
    }
  },

  createBranch: async (data: CreateBranchData) => {
    set({ isCreating: true, error: null });

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("location", data.location);
      formData.append("latitude", data.latitude.toString());
      formData.append("longitude", data.longitude.toString());
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("branchManagerName", data.branchManagerName);
      formData.append("branchManagerPhone", data.branchManagerPhone);

      // Append files if any
      if (data.files && data.files.length > 0) {
        data.files.forEach((file) => {
          formData.append("files", file);
        });
      }

      const response = await api.post<Branch>("/branch", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Add the new branch to the list
      set((state) => ({
        branches: [...state.branches, response.data],
        isCreating: false,
        error: null,
      }));

      return true;
    } catch (error: unknown) {
      let errorMessage = "Failed to create branch. Please try again.";

      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }

      set({
        isCreating: false,
        error: errorMessage,
      });

      return false;
    }
  },

  getBranchById: (id: number) => {
    return get().branches.find((branch) => branch.id === id);
  },

  setSelectedBranch: (branch: Branch | null) => {
    set({ selectedBranch: branch });
  },

  clearError: () => {
    set({ error: null });
  },
}));
