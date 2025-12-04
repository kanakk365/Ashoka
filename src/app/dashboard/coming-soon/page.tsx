import React from "react";
import Link from "next/link";

export default function ComingSoonPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-[#009B9B] to-[#009C5B] rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Coming Soon!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            This page is currently under development. We're working hard to
            bring you this feature soon.
          </p>

          <Link
            href="/dashboard"
            className="inline-block px-8 py-3 bg-gradient-to-r from-[#009B9B] to-[#009C5B] text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
