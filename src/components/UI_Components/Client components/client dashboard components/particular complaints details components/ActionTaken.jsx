"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Loader, AlertCircle, XCircle, Info } from "lucide-react";
import useFetch from "@/custom hooks/useFetch";
import { getBackendUrl } from "@/lib/getBackendUrl";
import useAccessToken from "@/custom hooks/useAccessToken";
import useNotificationStore from "@/store/notificationStore";
import { useSocket } from "@/context/socketContext";
import { AiOutlineSolution } from "react-icons/ai";
import RejectionReasonDisplay from "./RejectionReasonDisplay";

// Acknowledgement options
const acknowledgements = [
  {
    value: "Consulted And Closed",
    label: "I have consulted with the user and closed the complaint.",
  },
  {
    value: "No User Response",
    label:
      "I haven't received any message from the user, but I believe I have taken all necessary actions for this complaint.",
  },
  {
    value: "Marked As Unwanted",
    label:
      "This complaint is irrelevant, invalid, or submitted without genuine intent.",
  },
];

const ActionTaken = ({
  complaintId,
  onStatusChange,
  status,
  setStatus,
  actionMessage,
  rejectionReason,
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      resolutionNote: "",
      acknowledgements: "",
    },
  });


  const { loading, error, fetchData } = useFetch();
  const { socket } = useSocket();
  const { token } = useAccessToken();
  const { userRole } = useNotificationStore();

  const [submittedData, setSubmittedData] = useState(
    status === "Pending Authorization" ||
      status === "Resolved" ||
      status === "Unwanted"
      ? actionMessage
      : null
  );

  // Determine visibility and interaction permissions
  const canSubmitAction =
    userRole === "SUB ADMIN" &&
    !["Resolved", "Unwanted", "Pending Authorization"].includes(status);

  const canViewActionData = () => {
    // Show action data only if:
    // 1. Status is "Resolved" or "Unwanted" (everyone can see)
    // 2. OR Status is "Pending Authorization" and user is SUPER ADMIN
    if (status === "Resolved" || status === "Unwanted") {
      return true;
    }
    if (status === "Pending Authorization" && userRole === "SUPER ADMIN") {
      return true;
    }
    return false;
  };

  const shouldShowComponent = () => {
    // Show component if:
    // 1. User can submit action (SUB ADMIN and not in final states)
    // 2. OR User can view action data (based on status and role)
    // 3. OR There's submitted data to show
    return (
      canSubmitAction ||
      canViewActionData() ||
      (submittedData && canViewActionData())
    );
  };

  // Join socket room and listen to close events
  useEffect(() => {
    if (!socket || !complaintId) return;

    socket.emit("joinComplaintRoom", `complaint_${complaintId}`);
    socket.on("close_complaint", (data) => {
      onStatusChange(data.timelineEvent);
      setStatus(data.timelineEvent.status_of_client);
      setSubmittedData({
        resolutionNote: data.resolutionNote,
        acknowledgements: data.acknowledgements,
      });
    });

    return () => socket.off("close_complaint");
  }, [socket, complaintId]);

  const onSubmit = async (formData) => {
    const url = getBackendUrl();
    const res = await fetchData(
      `${url}/api/client/close-complaint/${complaintId}`,
      "PATCH",
      formData,
      token,
      false
    );
  };

  // Don't render component if user shouldn't see it
  if (!shouldShowComponent()) {
    return null;
  }

  const getComponentTitle = () => {
    if (status === "Pending Authorization" && userRole === "SUPER ADMIN") {
      return "Action Taken (Pending Your Authorization)";
    }
    if (status === "Resolved" || status === "Unwanted") {
      return "Action Taken";
    }
    return "Action Taken";
  };

  const getStatusBadge = () => {
    if (status === "Pending Authorization" && userRole === "SUPER ADMIN") {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow/10 text-yellow/80 ml-2">
          Pending Authorization
        </span>
      );
    }
    return null;
  };



  return (
    <div className="bg-white rounded-xl shadow-md p-3">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
          <AiOutlineSolution className="h-5 w-5 text-primary" />
        </div>
        <div className="flex items-center">
          <h3 className="text-lg font-semibold text-text_color dark:text-text-light">
            {getComponentTitle()}
          </h3>
          {getStatusBadge()}
        </div>
      </div>

      {/* Show submitted data (read-only) when user can view it */}
      {submittedData && canViewActionData() ? (
        <div className="space-y-4 mt-4">
          <div>
            <p className="text-sm font-bold text-text_color">Action Note:</p>
            <div className="p-3 mt-3 bg-gray-100 rounded-md text-sm border-l-4 border-primary">
              {submittedData.resolutionNote}
            </div>
          </div>
          <div>
            <p className="text-sm font-bold">Acknowledgement:</p>
            <div className="p-3 mt-2 bg-gray-100 rounded-md text-sm border-l-4 border-primary">
              {
                acknowledgements.find(
                  (opt) => opt.value === submittedData.acknowledgements
                )?.label
              }
            </div>
          </div>

          {/* Show authorization status for SUPER ADMIN when pending */}
          {status === "Pending Authorization" && userRole === "SUPER ADMIN" && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-800 font-medium">
                ⚠️ This action is awaiting your authorization. Please review and
                approve/reject from the authorization panel.
              </p>
            </div>
          )}
        </div>
      ) : canSubmitAction ? (
        /* Show form for SUB ADMIN when they can submit */
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div>
            <Label
              htmlFor="resolutionNote"
              className="text-sm font-medium text-text_color mb-2 block"
            >
              Action Note *
            </Label>
            <Textarea
              id="resolutionNote"
              {...register("resolutionNote", {
                required: "Action note is required",
                minLength: {
                  value: 10,
                  message: "Action note must be at least 10 characters long",
                },
              })}
              placeholder="Describe the action taken to resolve this complaint..."
              className="min-h-[120px] border border-dialog_inside_border_color rounded-md"
            />
            {errors.resolutionNote && (
              <p className="text-red text-sm mt-1">
                {errors.resolutionNote.message}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium text-text_color">
              Acknowledgement *
            </Label>
            {acknowledgements.map((option, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-3 p-2 rounded-md hover:bg-gray-50"
              >
                <Controller
                  control={control}
                  name="acknowledgements"
                  rules={{ required: "Please select one acknowledgement" }}
                  render={({ field }) => (
                    <Checkbox
                      id={`ack-${idx}`}
                      checked={field.value === option.value}
                      onCheckedChange={(checked) =>
                        field.onChange(checked ? option.value : "")
                      }
                      className="border border-primary mt-1"
                    />
                  )}
                />
                <Label
                  htmlFor={`ack-${idx}`}
                  className="text-sm font-light text-text_color leading-relaxed cursor-pointer flex-1"
                >
                  {option.label}
                </Label>
              </div>
            ))}
            {errors.acknowledgements && (
              <p className="text-red text-sm mt-1">
                {errors.acknowledgements.message}
              </p>
            )}
          </div>

          <div className="flex justify-end pt-4">
            <Button
              disabled={loading}
              type="submit"
              className="bg-primary text-white hover:bg-primary/90 px-6"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <Loader className="animate-spin h-4 w-4" />
                  <span>Submitting...</span>
                </div>
              ) : (
                "Submit Action"
              )}
            </Button>
          </div>

          {error && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red text-sm">{error}</p>
            </div>
          )}

          {/* Enhanced Rejection Reason Display */}
          <RejectionReasonDisplay reasons={rejectionReason} />
        </form>
      ) : null}
    </div>
  );
};

export default ActionTaken;
