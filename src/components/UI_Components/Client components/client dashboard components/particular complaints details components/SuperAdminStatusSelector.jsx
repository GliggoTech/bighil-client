"use client";
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useFetch from "@/custom hooks/useFetch";
import { getBackendUrl } from "@/lib/getBackendUrl";
import { toast } from "@/hooks/use-toast";
import { FaExchangeAlt } from "react-icons/fa";

const SuperAdminStatusSelector = ({
  superAdminStatus,
  setSuperAdminStatus,
  complaintId,
  token,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRejectionDialogOpen, setIsRejectionDialogOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [localStatus, setLocalStatus] = useState(superAdminStatus);
  const [isApproving, setIsApproving] = useState(false); // New state for approval loading
  const { fetchData, loading, success, error } = useFetch();


  const statusOptions = ["Pending", "Approved", "Rejected"];

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow ";
      case "Approved":
        return "text-green ";
      case "Rejected":
        return "text-red ";
      default:
        return "text-gray ";
    }
  };

  const handleStatusChange = (newStatus) => {
    if (newStatus === localStatus) return;

    // Prevent changes if already approved
    if (localStatus === "Approved") return;

    setPendingStatus(newStatus);

    // If user selects "Rejected", show the rejection reason dialog
    if (newStatus === "Rejected") {
      setIsRejectionDialogOpen(true);
    } else {
      // For other statuses, show the regular confirmation dialog
      setIsDialogOpen(true);
    }
  };

  const confirmStatusChange = async (reason = "") => {
    try {
      // Set approval loading state if status is "Approved"
      if (pendingStatus === "Approved") {
        setIsApproving(true);
      }

      const url = getBackendUrl();

      // Prepare the payload
      const payload = { status: pendingStatus };

      // Add rejection reason if status is "Rejected"
      if (pendingStatus === "Rejected" && reason) {
        payload.rejectionReason = reason;
      }

      const res = await fetchData(
        `${url}/api/client/change-authorization-status/${complaintId}`,
        "PATCH",
        payload,
        token,
        false
      );

      if (res.success) {
     
        // Update both local state and parent state
        if (res.data.resetStatus) {
          setLocalStatus("Pending");
        } else {
          setLocalStatus(pendingStatus);
        }
        setSuperAdminStatus(pendingStatus);

        setIsDialogOpen(false);
        setIsRejectionDialogOpen(false);
        setPendingStatus("");
        setRejectionReason("");
        toast({
          title: "Success",
          variant: "success",
          description: "Authorization status updated successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: error.message,
      });
    } finally {
      // Reset approval loading state
      setIsApproving(false);
    }
  };

  const handleRejectionSubmit = () => {
    if (!rejectionReason.trim()) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Please provide a reason for rejection",
      });
      return;
    }
    confirmStatusChange(rejectionReason);
  };

  const cancelStatusChange = () => {
    setIsDialogOpen(false);
    setPendingStatus("");
  };

  const cancelRejection = () => {
    setIsRejectionDialogOpen(false);
    setPendingStatus("");
    setRejectionReason("");
  };

  // Check if the component should be read-only
  const isReadOnly = localStatus === "Approved";

  return (
    <>
      <div className="w-full bg-white p-2 rounded-xl">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 transition-all duration-300">
            <FaExchangeAlt
              className="h-5 w-5 text-primary"
              aria-hidden="true"
            />
          </div>
          <h3 className="text-lg font-semibold text-text_color dark:text-text-light">
            Authorization Status
          </h3>
        </div>
        <p className="text-sm text-text_color dark:text-text_color mt-2 mb-4">
          {isReadOnly
            ? "This case has been approved and cannot be changed."
            : "Change the authorization status of this case."}
        </p>

        <Select
          value={localStatus}
          onValueChange={handleStatusChange}
          disabled={isReadOnly || isApproving}
        >
          <SelectTrigger
            className={`w-72 bg-white border-none ${
              isReadOnly ? "opacity-100 cursor-not-allowed" : ""
            }`}
          >
            <SelectValue placeholder="Select status" />
            {isApproving && (
              <div className="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            )}
          </SelectTrigger>
          <SelectContent className="max-h-60 overflow-y-auto bg-white border-none">
            {statusOptions.map((status) => (
              <SelectItem key={status} value={status}>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      status === "Pending"
                        ? "bg-yellow/50"
                        : status === "Approved"
                        ? "bg-green/50"
                        : "bg-red/50"
                    }`}
                  />
                  {status}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Regular Status Change Confirmation Dialog */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="max-w-lg bg-white rounded-lg flex flex-col space-y-1">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                <span className="text-amber-600 text-sm">⚠</span>
              </div>
              Confirm Status Change
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base bg-white rounded-lg">
              Are you sure you want to change the authorization status?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">From:</span>
              <span
                className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(
                  localStatus
                )}`}
              >
                {localStatus}
              </span>
            </div>
            <div className="flex items-center justify-center text-gray-400">
              ↓
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">To:</span>
              <span
                className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(
                  pendingStatus
                )}`}
              >
                {pendingStatus}
              </span>
            </div>
          </div>
          <p className="text-sm text-text_color">
            This action will update the user's authorization status and may
            affect their access permissions.
          </p>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={cancelStatusChange}
              className="text-gray-500 hover:text-gray-700 border-none hover:bg-none"
              disabled={loading || isApproving}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => confirmStatusChange()}
              className="bg-primary text-white hover:bg-primary/80"
              disabled={loading || isApproving}
            >
              {loading || isApproving ? "Updating..." : "Confirm Change"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Rejection Reason Dialog */}
      <Dialog
        open={isRejectionDialogOpen}
        onOpenChange={setIsRejectionDialogOpen}
      >
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-red/10 flex items-center justify-center">
                <span className="text-red text-sm">✕</span>
              </div>
              Rejection Reason
            </DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this authorization request.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="rejectionReason"
                className="text-sm font-medium text-text_color"
              >
                Reason for Rejection <span className="text-red">*</span>
              </label>
              <Textarea
                id="rejectionReason"
                placeholder="Enter the reason for rejection..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="min-h-[100px] "
                maxLength={500}
              />
              <div className="text-xs text-text_color text-right">
                {rejectionReason.length}/500 characters
              </div>
            </div>
          </div>

          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={cancelRejection}
              disabled={loading}
              className="text-white bg-red"
            >
              Cancel
            </Button>
            <Button
              onClick={handleRejectionSubmit}
              disabled={loading || !rejectionReason.trim()}
              className="bg-primary hover:bg-primary/70 text-white"
            >
              {loading ? "Rejecting..." : "Reject Authorization"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SuperAdminStatusSelector;
