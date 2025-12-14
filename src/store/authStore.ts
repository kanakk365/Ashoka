import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/lib/api";

interface AuthState {
  accessToken: string | null;
  email: string | null;
  role: string | null;
  permissions: string[];
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string, role?: string) => Promise<boolean>;
  register: (email: string, password: string, role?: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

interface LoginResponse {
  accessToken: string;
  email: string;
  role: string;
  permissions: string[];
}

interface RegisterResponse {
  email: string;
  role: string;
  permissions: string[];
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      email: null,
      role: null,
      permissions: [],
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (
        email: string,
        password: string,
        role: string = "ADMIN"
      ) => {
        set({ isLoading: true, error: null });

        try {
          const response = await api.post<LoginResponse>("/auth/login", {
            email,
            password,
            role,
          });

          const {
            accessToken,
            email: userEmail,
            role: userRole,
            permissions,
          } = response.data;

          // Store token in localStorage for the API interceptor
          localStorage.setItem("accessToken", accessToken);

          set({
            accessToken,
            email: userEmail,
            role: userRole,
            permissions,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          return true;
        } catch (error: unknown) {
          let errorMessage = "Login failed. Please try again.";

          if (error && typeof error === "object" && "response" in error) {
            const axiosError = error as {
              response?: { data?: { message?: string } };
            };
            errorMessage = axiosError.response?.data?.message || errorMessage;
          }

          set({
            isLoading: false,
            error: errorMessage,
            isAuthenticated: false,
          });

          return false;
        }
      },

      register: async (
        email: string,
        password: string,
        role: string = "ADMIN"
      ) => {
        set({ isLoading: true, error: null });

        try {
          const response = await api.post<RegisterResponse>("/auth/register", {
            email,
            password,
            role,
          });

          const {
            email: userEmail,
            role: userRole,
            permissions,
          } = response.data;

          // Registration successful - user needs to login
          set({
            email: userEmail,
            role: userRole,
            permissions,
            isLoading: false,
            error: null,
          });

          return true;
        } catch (error: unknown) {
          let errorMessage = "Registration failed. Please try again.";

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

          return false;
        }
      },

      logout: () => {
        // Clear token from localStorage
        localStorage.removeItem("accessToken");

        set({
          accessToken: null,
          email: null,
          role: null,
          permissions: [],
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        accessToken: state.accessToken,
        email: state.email,
        role: state.role,
        permissions: state.permissions,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
