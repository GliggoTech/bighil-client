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
import { useSocket } from "@/context/socketContext";
import { Loader2, AlertTriangle } from "lucide-react";
import { statusConfig } from "@/utils/timeLineColors";

const StatusSelector = ({
  status,
  setStatus,
  complaintId,
  onStatusChange,
  userRole,
}) => {
  const { loading, success, error, fetchData } = useFetch();
  const token = useAccessToken();

  const config = statusConfig[status] || statusConfig.default;

  // Only ADMIN or SUPER ADMIN can edit
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
    // setStatus(value); // Update local state
    // onStatusChange(value); // Optional callback
  };

  // If Resolved, always show read-only
  if (status === "Resolved") {
    return (
      // <div
      //   className={`w-[180px] px-4 py-2 ${config.style.border} rounded-xl ${config.style.bg} text-black text-center text-sm font-medium shadow-sm`}
      // >
      //   {status}
      // </div>
      null
    );
  }

  // If not editable, show read-only
  if (!isEditable) {
    return (
      // <div
      //   className={`w-[180px] px-4 py-2 ${config.style.border} rounded-xl ${config.style.bg} text-black text-center text-sm font-medium shadow-sm`}
      // >
      //   {status}
      // </div>
      null
    );
  }

  return (
    <div className="relative w-[180px]">
      <Select value={status} onValueChange={handleChange} disabled={loading}>
        <SelectTrigger
          className={`w-full rounded-lg border-none ring-0  px-4 py-2 text-sm font-medium shadow-sm transition ${
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
