"use client";

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
import { Loader2, AlertTriangle } from "lucide-react";
import { statusConfig } from "@/utils/timeLineColors";
import { FaExchangeAlt } from "react-icons/fa";

const StatusSelector = ({ status, complaintId, userRole }) => {
  const { loading, error, fetchData } = useFetch();
  const { token } = useAccessToken();
  const config = statusConfig[status] || statusConfig.default;

  const isEditable = userRole === "ADMIN" || userRole === "SUPER ADMIN";

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

  if (status === "Resolved" || !isEditable) return null;

  return (
    <div className="relative bg-white dark:bg-surface-dark rounded-xl p-3 shadow-sm">
      {/* Title and Description */}
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 transition-all duration-300">
          <FaExchangeAlt className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-text_color dark:text-text-light">
          Update Case Status
        </h3>
      </div>
      <p className="text-sm text-text_color dark:text-text_color mt-2 mb-4">
        Change and track the current status of this case.
      </p>

      {/* Status Selector */}
      <Select value={status} onValueChange={handleChange} disabled={loading}>
        <SelectTrigger
          className={`w-40 bg-white rounded-lg border-primary px-4 py-2 text-sm font-medium shadow-sm transition ${
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

        <SelectContent className="rounded-xl bg-white border-none text-gray-800 shadow-lg">
          <SelectItem
            value="Pending"
            className="hover:bg-primary/10 cursor-pointer text-sm"
          >
            Pending
          </SelectItem>
          <SelectItem
            value="In Progress"
            className="hover:bg-primary/10 cursor-pointer text-sm"
          >
            In Progress
          </SelectItem>
          <SelectItem
            value="Unwanted"
            className="hover:bg-primary/10 cursor-pointer text-sm"
          >
            Unwanted
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Error State */}
      {error && (
        <div className="mt-2 flex items-center text-red text-xs">
          <AlertTriangle className="h-4 w-4 mr-1" />
          <span>Something went wrong!</span>
        </div>
      )}
    </div>
  );
};

export default StatusSelector;
