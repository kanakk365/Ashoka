"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

interface AuthGuardProps {
    children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        // Check if we're on the client side
        if (typeof window !== "undefined") {
            // Small delay to allow Zustand to hydrate from localStorage
            const timer = setTimeout(() => {
                const token = localStorage.getItem("accessToken");

                if (!token && !isAuthenticated) {
                    router.push("/login");
                } else {
                    setIsChecking(false);
                }
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [isAuthenticated, router]);

    // Show loading state while checking auth
    if (isChecking) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-gray-200 border-t-[#E33424] rounded-full animate-spin" />
                    <p className="text-gray-500 text-sm">Loading...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
