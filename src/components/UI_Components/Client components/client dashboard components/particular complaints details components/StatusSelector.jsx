"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/custome hooks/useFetch";
import { getBackendUrl } from "@/lib/getBackendUrl";
import useAccessToken from "@/custome hooks/useAccessToken";
// import socketClient from "@/lib/socket";
import { useSocket } from "@/context/socketContext";

const StatusSelector = ({ status, setStatus, complaintId, onStatusChange }) => {
  const { loading, success, error, fetchData } = useFetch();
  const token = useAccessToken();
  const socket = useSocket();

  // useEffect(() => {
  //   if (!socket || !complaintId) return;

  //   // Use normalized complaint ID format
  //   const normalizedId = `complaint_${complaintId}`;

  //   const handleNewStatus = (data) => {
  //     console.log("Status update received:", data);
  //     setStatus(data.status_of_client);
  //     onStatusChange(data.timelineEvent);
  //   };

  //   // Join using client method
  //   socket.joinComplaintRoom(normalizedId);
  //   socket.on("status_change", handleNewStatus);

  //   return () => {
  //     socket.off("status_change", handleNewStatus);
  //   };
  // }, [socket, complaintId, onStatusChange]);

  const handleChange = async (value) => {
    const url = getBackendUrl();

    const res = await fetchData(
      `${url}/api/client/change-status/${complaintId}`,
      "PATCH",
      { status: value },
      token,
      false
    );
    // console.log(res);
    // if (res.success) {
    //   setStatus(res.data.status_of_client);
    //   onStatusChange(res.data.timelineEvent);
    // }
  };

  // If status is Resolved, show a simple badge and do not allow changes.
  if (status === "Resolved") {
    return (
      <div className="w-[180px] px-3 py-2 border rounded-md bg-gray-200 text-gray-600 text-center">
        {status}
      </div>
    );
  }

  return (
    <Select value={status} onValueChange={handleChange} className="">
      <SelectTrigger className="w-[180px] ">
        <SelectValue value={status} placeholder="Select status" />
      </SelectTrigger>
      <SelectContent className="rounded-xl bg-primary text-white z-50 cursor-pointer">
        <SelectItem
          value="Pending"
          className="border-b-[1px] border-white cursor-pointer"
        >
          Pending
        </SelectItem>
        <SelectItem
          value="In Progress"
          className="border-b-[1px] border-white cursor-pointer"
        >
          In Progress
        </SelectItem>
        {/* <SelectItem value="Resolved">Resolved</SelectItem> */}
        <SelectItem value="Unwanted" className="cursor-pointer">
          Unwanted
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default StatusSelector;
