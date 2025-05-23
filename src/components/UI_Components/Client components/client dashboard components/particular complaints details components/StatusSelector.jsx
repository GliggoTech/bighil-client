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
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const StatusSelector = ({ status, complaintId, userRole }) => {
  const { loading, error, fetchData } = useFetch();
  const [pendingStatus, setPendingStatus] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { token } = useAccessToken();

  const isEditable = userRole === "ADMIN" || userRole === "SUPER ADMIN";
  const handleChange = (value) => {
    if (value === status) return; // Prevent same status selection
    setPendingStatus(value);
    setShowConfirmDialog(true);
  };
  // const handleChange = async (value) => {
  //   const url = getBackendUrl();
  //   await fetchData(
  //     `${url}/api/client/change-status/${complaintId}`,
  //     "PATCH",
  //     { status: value },
  //     token,
  //     false
  //   );
  // };
  const confirmStatusChange = async () => {
    if (!pendingStatus) return;

    const url = getBackendUrl();
    await fetchData(
      `${url}/api/client/change-status/${complaintId}`,
      "PATCH",
      { status: pendingStatus },
      token,
      false
    );

    setShowConfirmDialog(false);
    setPendingStatus(null);
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
      <Select
        value={status}
        onValueChange={handleChange}
        disabled={loading || showConfirmDialog}
      >
        <SelectTrigger
          className={`w-48 bg-white rounded-lg border-primary px-4 py-2 text-sm font-medium shadow-sm transition ${
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
          {/* Only show Pending if current status is Pending */}
          {status === "Pending" && (
            <SelectItem
              value="Pending"
              className="hover:bg-primary/10 cursor-pointer text-sm"
              disabled
            >
              Pending
            </SelectItem>
          )}

          {/* Always show In Progress but disable if already selected */}
          <SelectItem
            value="In Progress"
            className="hover:bg-primary/10 cursor-pointer text-sm"
            disabled={status === "In Progress"}
          >
            In Progress
            {status === "In Progress" && (
              <span className="ml-2 text-xs text-green-500">(Current)</span>
            )}
          </SelectItem>

          {/* Show Unwanted unless already in progress */}
          <SelectItem
            value="Unwanted"
            className="hover:bg-primary/10 cursor-pointer text-sm"
            disabled={status === "Unwanted" || status === "In Progress"}
          >
            Unwanted
            {status === "Unwanted" && (
              <span className="ml-2 text-xs text-red-500">(Current)</span>
            )}
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
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="max-w-sm bg-white">
          <DialogHeader className="flex flex-col space-y-3">
            <DialogTitle>Confirm Status Change</DialogTitle>
            <DialogDescription className="text-sm mt-10">
              You're changing status from <strong>{status}</strong> to{" "}
              <strong>{pendingStatus}</strong>. This action will be recorded in
              the timeline.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
              className="text-white bg-red"
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={confirmStatusChange}
              disabled={loading}
              className="text-white"
            >
              {loading ? (
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
              ) : null}
              Confirm Change
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StatusSelector;
