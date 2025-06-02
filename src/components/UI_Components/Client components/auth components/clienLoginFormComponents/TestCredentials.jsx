"use client";
import { useState } from "react";
import { Info } from "lucide-react";

export function TestCredentials() {
  const [showCredentials, setShowCredentials] = useState(false);

  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <button
        onClick={() => setShowCredentials(!showCredentials)}
        className="w-full flex items-center justify-center space-x-2 text-sm text-gray-500 hover:text-gray-700"
      >
        <Info className="h-4 w-4" />
        <span>{showCredentials ? "Hide" : "Show"} Test Credentials</span>
      </button>

      {showCredentials && (
        <div className="mt-3 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
          <p className="font-medium mb-2">Test Credentials:</p>
          <p>
            <strong>Email:</strong> test@example.com
          </p>
          <p>
            <strong>Password:</strong> password123
          </p>
          <p className="mt-2 text-gray-500">
            Use these credentials for testing purposes
          </p>
        </div>
      )}
    </div>
  );
}
