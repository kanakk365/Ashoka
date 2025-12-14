"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Check, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export default function RegisterPage() {
    const router = useRouter();
    const { register, isLoading, error, clearError } = useAuthStore();

    const [step, setStep] = useState<"register" | "success">("register");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);

    // Clear errors when inputs change
    useEffect(() => {
        if (localError) setLocalError(null);
        if (error) clearError();
    }, [email, password, confirmPassword]);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleRegister = async () => {
        // Validation
        if (!email) {
            setLocalError("Email is required");
            return;
        }

        if (!validateEmail(email)) {
            setLocalError("Please enter a valid email address");
            return;
        }

        if (!password) {
            setLocalError("Password is required");
            return;
        }

        if (password.length < 8) {
            setLocalError("Password must be at least 8 characters");
            return;
        }

        if (password !== confirmPassword) {
            setLocalError("Passwords do not match");
            return;
        }

        setLocalError(null);

        const success = await register(email, password, "ADMIN");

        if (success) {
            router.push("/login");
        }
    };

    const handleGoToLogin = () => {
        router.push("/login");
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !isLoading) {
            handleRegister();
        }
    };

    const displayError = localError || error;

    return (
        <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center font-sans">
            {/* Background Gradient */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "linear-gradient(180deg, #E33424 0%, #C00F00 100%)",
                }}
            />
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url('/bg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            {/* Perspective Grid */}
            <div
                className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
                style={{ perspective: "100vh" }}
            >
                <div
                    className="w-[200vw] h-[200vh] origin-top"
                    style={{
                        transform: "rotateX(60deg) translateY(-100vh) translateZ(-200px)",
                        backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
                        backgroundSize: "80px 80px",
                        maskImage:
                            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
                        WebkitMaskImage:
                            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
                    }}
                />
            </div>

            {/* Register Content */}
            <div className="relative z-10 flex flex-col items-center w-full max-w-md px-4">
                {/* Logo above the card */}
                <div className="mb-8 w-64 h-20 relative">
                    <img
                        src="/white-logo.png"
                        alt="Ashoka Yamaha"
                        className="object-contain w-full h-full"
                    />
                </div>

                {/* Card */}
                <div className="w-full bg-white rounded-[2rem] shadow-xl p-8 md:p-12 min-h-[450px] flex flex-col justify-center">
                    {step === "register" && (
                        <>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
                                Create an Account
                            </h2>
                            <p className="text-gray-500 text-sm mb-6 text-center">
                                Enter your details to register
                            </p>

                            <div className="space-y-5" onKeyDown={handleKeyPress}>
                                <div className="space-y-2">
                                    <label className="text-gray-500 text-sm font-medium ml-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        disabled={isLoading}
                                        className={`w-full px-4 py-3 rounded-lg border ${displayError ? "border-red-500" : "border-gray-200"
                                            } focus:outline-none focus:ring-2 focus:ring-[#E33424] focus:border-transparent text-black disabled:bg-gray-100 disabled:cursor-not-allowed`}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-gray-500 text-sm font-medium ml-1">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Create a password"
                                            disabled={isLoading}
                                            className={`w-full px-4 py-3 pr-12 rounded-lg border ${displayError ? "border-red-500" : "border-gray-200"
                                                } focus:outline-none focus:ring-2 focus:ring-[#E33424] focus:border-transparent text-black disabled:bg-gray-100 disabled:cursor-not-allowed`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                            disabled={isLoading}
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-gray-500 text-sm font-medium ml-1">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Confirm your password"
                                            disabled={isLoading}
                                            className={`w-full px-4 py-3 pr-12 rounded-lg border ${displayError ? "border-red-500" : "border-gray-200"
                                                } focus:outline-none focus:ring-2 focus:ring-[#E33424] focus:border-transparent text-black disabled:bg-gray-100 disabled:cursor-not-allowed`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                            disabled={isLoading}
                                        >
                                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                {displayError && (
                                    <p className="text-red-500 text-xs italic text-center">
                                        {displayError}
                                    </p>
                                )}

                                <button
                                    onClick={handleRegister}
                                    disabled={isLoading}
                                    className="w-full text-white font-medium py-3 rounded-lg transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    style={{
                                        background:
                                            "linear-gradient(92.57deg, #E33424 -11.84%, #C00F00 100.76%), linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2))",
                                    }}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" />
                                            Creating Account...
                                        </>
                                    ) : (
                                        "Create Account"
                                    )}
                                </button>

                                <p className="text-center text-sm text-gray-500">
                                    Already have an account?{" "}
                                    <button
                                        onClick={handleGoToLogin}
                                        className="text-[#E33424] font-semibold hover:underline"
                                        disabled={isLoading}
                                    >
                                        Sign In
                                    </button>
                                </p>
                            </div>
                        </>
                    )}

                    {step === "success" && (
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-[#E33424] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-[#E33424]/30">
                                <Check size={40} className="text-white stroke-[4]" />
                            </div>
                            <h2 className="text-xl font-medium text-gray-900 mb-2 text-center">
                                Account Created Successfully!
                            </h2>
                            <p className="text-gray-500 text-sm mb-8 text-center">
                                You can now sign in with your credentials
                            </p>

                            <button
                                onClick={handleGoToLogin}
                                className="w-full text-white font-medium py-3 rounded-lg cursor-pointer"
                                style={{
                                    background:
                                        "linear-gradient(92.57deg, #E33424 -11.84%, #C00F00 100.76%), linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2))",
                                }}
                            >
                                Go to Login
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
