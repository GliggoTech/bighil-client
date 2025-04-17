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

// Define acknowledgement options
const acknowledgements = [
  {
    value: "ConsultedAndClosed",
    label: "I have consulted with the user and closed the complaint.",
  },
  {
    value: "NoUserResponse",
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
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      resolutionNote: "",
      acknowledgements: "",
    },
  });
  const { loading, error, fetchData } = useFetch();
  const { socket } = useSocket();
  // State to store submitted form values after success
  const [submittedData, setSubmittedData] = useState(
    status == "Resolved" ? actionMessage : null
  );
  const { userRole } = useNotificationStore();
  const isReadOnly =
    status === "Resolved" ||
    !(userRole === "ADMIN" || userRole === "SUPER ADMIN");

  const token = useAccessToken();
  useEffect(() => {
    if (!socket || !complaintId) {
      return;
    }
    socket.emit("joinComplaintRoom", `complaint_${complaintId}`);
    socket.on("close_complaint", (returnData) => {
      console.log("Status update received:", returnData);
      onStatusChange(returnData.timelineEvent);
      setStatus("Resolved");
      setSubmittedData({
        resolutionNote: returnData.resolutionNote,
        acknowledgements: returnData.acknowledgements,
      });
    });
    return () => {
      socket.off("close_complaint");
    };
  }, [socket, complaintId, userRole]);
  // Function to handle form submission
  const onSubmit = async (data) => {
    // Get the backend URL
    const url = getBackendUrl();

    // Fetch data from the backend API
    const res = await fetchData(
      `${url}/api/client/close-complaint/${complaintId}`,
      "PATCH",
      data,
      token,
      false
    );

    // If the response is successful
    if (res.success) {
      // // Set the status to "Resolved"
      // setStatus("Resolved");
      // // If there is an onStatusChange function, call it with the new timeline document
      // if (onStatusChange) {
      //   onStatusChange(res.data.newTimelineDoc);
      // }
      // // Save the submitted data so we can display it as non-editable
      // setSubmittedData(data);
      // // Optionally, you can call reset() here if needed:
      // // reset();
      console.log(res);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Action Taken</h2>
      {submittedData ? (
        // Display submitted values as read-only text
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold">Action Note:</p>
            <p className="p-2 border border-gray-300 rounded-md bg-gray-100">
              {submittedData.resolutionNote}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">Acknowledgement:</p>
            <p className="p-2 border border-gray-300 rounded-md bg-gray-100">
              {
                acknowledgements.find(
                  (opt) => opt.value === submittedData.acknowledgements
                )?.label
              }
            </p>
          </div>
        </div>
      ) : (
        // Render the form if no data is submitted yet
        !isReadOnly && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Textarea
              {...register("resolutionNote", {
                required: "Action note is required",
              })}
              placeholder="Describe the action taken..."
              className="min-h-[120px] resize-none border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="space-y-2">
              {acknowledgements.map((option, index) => (
                <div key={index} className="flex items-center">
                  <Controller
                    control={control}
                    name="acknowledgements"
                    rules={{ required: "Please select one acknowledgement" }}
                    render={({ field }) => (
                      <Checkbox
                        id={`ack-${index}`}
                        checked={field.value === option.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked ? option.value : "");
                        }}
                      />
                    )}
                  />
                  <Label htmlFor={`ack-${index}`} className="ml-2">
                    {option.label}
                  </Label>
                </div>
              ))}
              {errors.acknowledgements && (
                <p className="text-red-500 text-sm">
                  {errors.acknowledgements.message}
                </p>
              )}
            </div>
            <div className="flex justify-end">
              {status !== "Resolved" && (
                <Button
                  disabled={loading}
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? <Loader /> : "Submit"}
                </Button>
              )}
            </div>
            {error && <p className="text-red-500 mt-3">{error}</p>}
          </form>
        )
      )}
      {isReadOnly && !submittedData && (
        <p className="text-gray-500">No action taken recorded yet</p>
      )}
    </div>
  );
};

export default ActionTaken;
