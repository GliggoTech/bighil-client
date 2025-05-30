"use client";
import { FileX, Home, Search, AlertCircle } from "lucide-react";

export default function NotFoundPageForComplaint() {
  const handleGoHome = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-default_bg flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon Section */}
        <div className="mb-8">
          <div className="relative mx-auto w-32 h-32 mb-6">
            <div className="absolute inset-0 bg-red/40 rounded-full flex items-center justify-center">
              <FileX className="w-16 h-16 text-red" />
            </div>
            <div className="absolute -top-2 -right-2 bg-orange rounded-full p-2">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Complaint Not Found
          </h1>
          <p className="text-gray-600 text-lg mb-2">
            We couldn&apos;t find the complaint you&apos;re looking for.
          </p>
          <p className="text-gray-500 text-sm">
            The complaint may have been removed, archived, or you may not have
            permission to access it.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleGoHome}
            className="w-full bg-blue hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-8 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            Need Help?
          </h3>
          <p className="text-xs text-gray-600">
            If you believe this is an error, please contact support or try
            refreshing the page.
          </p>
        </div>
      </div>
    </div>
  );
}
