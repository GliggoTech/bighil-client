"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import useFetch from "@/custom hooks/useFetch";
import { getBackendUrl } from "@/lib/getBackendUrl";
import useAccessToken from "@/custom hooks/useAccessToken";
import useNotificationStore from "@/store/notificationStore";
import { useSocket } from "@/context/socketContext";
import { AiOutlineSolution } from "react-icons/ai";

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
];

const ActionTaken = ({
  complaintId,
  onStatusChange,
  status,
  setStatus,
  actionMessage,
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
    status === "Resolved" ? actionMessage : null
  );

  const isReadOnly =
    status === "Resolved" || !["ADMIN", "SUPER ADMIN"].includes(userRole);

  // Join socket room and listen to close events
  useEffect(() => {
    if (!socket || !complaintId) return;

    socket.emit("joinComplaintRoom", `complaint_${complaintId}`);
    socket.on("close_complaint", (data) => {
      onStatusChange(data.timelineEvent);
      setStatus("Resolved");
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

    if (res.success) {
      // Await socket response to update UI
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-3">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
          <AiOutlineSolution className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-text_color dark:text-text-light">
          Action Taken
        </h3>
      </div>

      {submittedData ? (
        <div className="space-y-4 mt-4">
          <div>
            <p className="text-sm font-bold text-text_color">Action Note:</p>
            <p className="p-3 mt-3 bg-gray-100 rounded-md text-sm">
              {submittedData.resolutionNote}
            </p>
          </div>
          <div>
            <p className="text-sm font-bold">Acknowledgement:</p>
            <p className="p-3 mt-2 bg-gray-100 rounded-md text-sm">
              {
                acknowledgements.find(
                  (opt) => opt.value === submittedData.acknowledgements
                )?.label
              }
            </p>
          </div>
        </div>
      ) : !isReadOnly ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <Textarea
            {...register("resolutionNote", {
              required: "Action note is required",
            })}
            placeholder="Describe the action taken..."
            className="min-h-[120px] border border-dialog_inside_border_color rounded-md"
          />
          <div className="space-y-2">
            {acknowledgements.map((option, idx) => (
              <div key={idx} className="flex items-center">
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
                      className="border border-primary"
                    />
                  )}
                />
                <Label htmlFor={`ack-${idx}`} className="ml-2 font-light">
                  {option.label}
                </Label>
              </div>
            ))}
            {errors.acknowledgements && (
              <p className="text-red text-sm">
                {errors.acknowledgements.message}
              </p>
            )}
          </div>
          <div className="flex justify-end">
            <Button
              disabled={loading}
              type="submit"
              className="bg-primary text-white"
            >
              {loading ? <Loader /> : "Submit"}
            </Button>
          </div>
          {error && <p className="text-red-500 mt-3">{error}</p>}
        </form>
      ) : (
        <p className="text-gray-500 mt-2">No action taken recorded yet</p>
      )}
    </div>
  );
};

export default ActionTaken;
