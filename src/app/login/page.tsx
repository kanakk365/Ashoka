"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"phone" | "otp" | "success">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState<string | null>(null);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleGetOTP = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setError("Incorrect Phone number");
      return;
    }
    setError(null);
    setStep("otp");
  };

  const handleVerifyOTP = () => {
    const otpString = otp.join("");
    if (otpString.length !== 4) {
      setError("Incorrect OTP Code");
      return;
    }
    setError(null);
    setStep("success");
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 3) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleGoToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center font-sans">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(180deg, #34AFA5 0%, #008378 100%)",
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

      {/* Login Content */}
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
        <div className="w-full bg-white rounded-[2rem] shadow-xl p-8 md:p-12 min-h-[400px] flex flex-col justify-center">
          {step === "phone" && (
            <>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
                Sign in to your Account
              </h2>
              <p className="text-gray-500 text-sm mb-8 text-center">
                Enter your mobile number to get started
              </p>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-gray-500 text-sm font-medium ml-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Enter Phone Id"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      error ? "border-red-500 text-red-500" : "border-gray-200"
                    } focus:outline-none text-black `}
                  />
                  {error && (
                    <p className="text-red-500 text-xs italic ml-1">{error}</p>
                  )}
                </div>

                <button
                  onClick={handleGetOTP}
                  className="w-full text-white font-medium py-3 rounded-lg transition-colors cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(92.57deg, #009B9B -11.84%, #009C5B 100.76%), linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2))",
                  }}
                >
                  Get OTP
                </button>
              </div>
            </>
          )}

          {step === "otp" && (
            <>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
                Verify your OTP
              </h2>
              <p className="text-gray-500 text-sm mb-8 text-center">
                Enter the 4 digit code sent to {phoneNumber}
              </p>

              <div className="space-y-8">
                <div className="flex justify-center gap-4">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        otpInputRefs.current[index] = el;
                      }}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className={`w-14 h-14 text-center text-xl font-semibold rounded-lg border ${
                        error
                          ? "border-red-500 text-red-500 bg-red-50"
                          : "border-gray-200 bg-[#E0F2F1]/30 text-[#34AFA5]"
                      } focus:outline-none focus:ring-2 focus:ring-[#34AFA5] focus:border-transparent transition-all`}
                    />
                  ))}
                </div>
                {error && (
                  <p className="text-red-500 text-xs italic text-center -mt-6">
                    {error}
                  </p>
                )}

                <div className="text-center text-xs text-gray-400">
                  Didn't get it 00:28?{" "}
                  <button
                    onClick={() => {
                      setOtp(["", "", "", ""]);
                      setError(null);
                      // Logic to resend OTP
                    }}
                    className="text-[#34AFA5] font-semibold hover:underline"
                  >
                    Resend
                  </button>
                </div>

                <button
                  onClick={handleVerifyOTP}
                  className="w-full text-white font-medium py-3 rounded-lg cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(92.57deg, #009B9B -11.84%, #009C5B 100.76%), linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2))",
                  }}
                >
                  Sign In
                </button>
              </div>
            </>
          )}

          {step === "success" && (
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-[#009C5B] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-[#009C5B]/30">
                <Check size={40} className="text-white stroke-[4]" />
              </div>
              <h2 className="text-xl font-medium text-gray-900 mb-8 text-center">
                OTP verified Successfully!!
              </h2>

              <button
                onClick={handleGoToDashboard}
                className="w-full text-white font-medium py-3 rounded-lg cursor-pointer"
                style={{
                  background:
                    "linear-gradient(92.57deg, #009B9B -11.84%, #009C5B 100.76%), linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2))",
                }}
              >
                Go to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
