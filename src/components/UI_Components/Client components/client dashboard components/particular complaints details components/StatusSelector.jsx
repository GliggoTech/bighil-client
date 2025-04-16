"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/custom hooks/useFetch";
import { getBackendUrl } from "@/lib/getBackendUrl";
import useAccessToken from "@/custom hooks/useAccessToken";
import { useSocket } from "@/context/socketContext";
import { Loader2, AlertTriangle } from "lucide-react";

const StatusSelector = ({ status, setStatus, complaintId, onStatusChange }) => {
  const { loading, success, error, fetchData } = useFetch();
  const token = useAccessToken();
  const socket = useSocket();

  const handleChange = async (value) => {
    const url = getBackendUrl();
    await fetchData(
      `${url}/api/client/change-status/${complaintId}`,
      "PATCH",
      { status: value },
      token,
      false
    );
  };

  // If status is Resolved, show a disabled badge
  if (status === "Resolved") {
    return (
      <div className="w-[180px] px-4 py-2 border rounded-md bg-gray-100 text-gray-600 text-center text-sm font-medium shadow-sm">
        {status}
      </div>
    );
  }

  return (
    <div className="relative w-[180px]">
      <Select value={status} onValueChange={handleChange} disabled={loading}>
        <SelectTrigger
          className={`w-full rounded-lg border px-4 py-2 text-sm font-medium shadow-sm transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="animate-spin h-4 w-4" />
              <span>Updating...</span>
            </div>
          ) : (
            <SelectValue placeholder="Select status" />
          )}
        </SelectTrigger>

        <SelectContent className="rounded-xl bg-white text-gray-800 shadow-lg">
          <SelectItem
            value="Pending"
            className="hover:bg-gray-100 cursor-pointer text-sm"
          >
            Pending
          </SelectItem>
          <SelectItem
            value="In Progress"
            className="hover:bg-gray-100 cursor-pointer text-sm"
          >
            In Progress
          </SelectItem>
          <SelectItem
            value="Unwanted"
            className="hover:bg-gray-100 cursor-pointer text-sm"
          >
            Unwanted
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Error State */}
      {error && (
        <div className="mt-2 flex items-center text-red-500 text-xs">
          <AlertTriangle className="h-4 w-4 mr-1" />
          <span>Something went wrong!</span>
        </div>
      )}
    </div>
  );
};

export default StatusSelector;
