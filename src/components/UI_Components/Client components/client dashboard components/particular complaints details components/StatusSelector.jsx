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
import { Textarea } from "@/components/ui/textarea";

const StatusSelector = ({ status, complaintId, userRole }) => {
  const { loading, error, fetchData } = useFetch();
  const [pendingStatus, setPendingStatus] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [unwantedReason, setUnwantedReason] = useState("");
  const { token } = useAccessToken();

  const isEditable = userRole === "SUB ADMIN" || userRole === "SUPER ADMIN";

  const handleChange = (value) => {
    if (value === status) return; // Prevent same status selection
    setPendingStatus(value);
    setShowConfirmDialog(true);
    // Reset unwanted reason when dialog opens
    if (value === "Unwanted") {
      setUnwantedReason("");
    }
  };

  const confirmStatusChange = async () => {
    if (!pendingStatus) return;

    // Validate unwanted reason if status is "Unwanted"
    if (
      pendingStatus === "Unwanted" &&
      userRole === "SUB ADMIN" &&
      !unwantedReason.trim()
    ) {
      return; // Don't proceed if reason is empty
    }

    const url = getBackendUrl();

    // Prepare request body
    const requestBody = { status: pendingStatus };

    // Add unwanted reason if status is "Unwanted" and user is SUB ADMIN
    if (pendingStatus === "Unwanted" && userRole === "SUB ADMIN") {
      requestBody.resolutionNote = unwantedReason.trim();
    }

    await fetchData(
      `${url}/api/client/change-status/${complaintId}`,
      "PATCH",
      requestBody,
      token,
      false
    );

    // Reset states
    setShowConfirmDialog(false);
    setPendingStatus(null);
    setUnwantedReason("");
  };

  const handleDialogClose = () => {
    setShowConfirmDialog(false);
    setPendingStatus(null);
    setUnwantedReason("");
  };

  if (status === "Resolved" || !isEditable) return null;

  const isUnwantedSelected =
    pendingStatus === "Unwanted" && userRole === "SUB ADMIN";
  const isConfirmDisabled =
    loading || (isUnwantedSelected && !unwantedReason.trim());

  return (
    <div className="w-full relative bg-white dark:bg-surface-dark rounded-xl p-3 shadow-sm">
      {/* Title and Description */}
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 transition-all duration-300">
          <FaExchangeAlt className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-text_color dark:text-text-light">
          {userRole === "SUPER ADMIN"
            ? "Current Case Status"
            : "Change Case Status"}
        </h3>
      </div>
      <p className="text-sm text-text_color dark:text-text_color mt-2 mb-4">
        {userRole === "SUPER ADMIN"
          ? "Track the current status of this case."
          : "Change and track the current status of this case."}
      </p>

      {/* Status Selector */}
      <Select
        value={status}
        onValueChange={handleChange}
        disabled={loading || showConfirmDialog}
      >
        <SelectTrigger
          className={` bg-white rounded-lg border-primary px-4 py-2 text-sm font-medium shadow-sm transition ${
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
            disabled={
              status === "In Progress" || status == "Pending Authorization"
            }
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
            disabled={
              status === "Unwanted" ||
              status === "In Progress" ||
              status == "Pending Authorization"
            }
          >
            Unwanted
            {status === "Unwanted" && (
              <span className="ml-2 text-xs text-red-500">(Current)</span>
            )}
          </SelectItem>
          <SelectItem
            value="Pending Authorization"
            className="hover:bg-primary/10 cursor-pointer text-sm"
            disabled={true}
          >
            Pending Authorization
            {status === "Pending Authorization" && (
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

      <Dialog open={showConfirmDialog} onOpenChange={handleDialogClose}>
        <DialogContent className="max-w-xl bg-white">
          <DialogHeader className="flex flex-col space-y-3">
            <DialogTitle>Confirm Status Change</DialogTitle>
            <DialogDescription className="text-sm mt-10">
              You're changing status from <strong>{status}</strong> to{" "}
              <strong>{pendingStatus}</strong>. This action will be recorded in
              the timeline.
            </DialogDescription>
          </DialogHeader>

          {/* Show textarea only when SUB ADMIN selects "Unwanted" */}
          {isUnwantedSelected && (
            <div className="space-y-2">
              <label
                htmlFor="unwanted-reason"
                className="text-sm font-medium text-text_color"
              >
                Reason for marking as unwanted{" "}
                <span className="text-red">*</span>
              </label>
              <Textarea
                id="unwanted-reason"
                placeholder="Please provide a reason for marking this case as unwanted..."
                value={unwantedReason}
                onChange={(e) => setUnwantedReason(e.target.value)}
                className="min-h-[80px] border-none"
                disabled={loading}
              />
              {!unwantedReason.trim() && (
                <p className="text-xs text-red">This field is required</p>
              )}
            </div>
          )}

          <DialogFooter className="flex flex-col gap-3 md:flex-row">
            <Button
              variant="outline"
              onClick={handleDialogClose}
              className="text-white bg-red order-2 sm:order-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={confirmStatusChange}
              disabled={isConfirmDisabled}
              className="text-white order-1 sm:order-2"
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
