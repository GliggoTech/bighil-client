// Fixed version of your ParticularComplaint component
"use client";

import React, { useEffect, useRef, useState } from "react";
import EvidenceGallery from "@/components/UI_Components/Standard_Components/EvidenceGallery";
import ComplaintDetails from "./ComplaintDetails";
import ComplaintHeader from "./ComplaintHeader";
import NotesSection from "./NotesSection";
import StatusSelector from "./StatusSelector";
import Timeline from "@/components/UI_Components/USER_Components/USER_Dashboard_Components/Timeline";
import ActionTaken from "./ActionTaken";
import ChatInterface from "./ChatInterface";
import useNotificationStore from "@/store/notificationStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useSocket } from "@/context/socketContext";
import { AlertCircle } from "lucide-react";
import { markNotificationAsRead } from "@/lib/markNotificationAsRead";
import useAccessToken from "@/custom hooks/useAccessToken";
import SuperAdminStatusSelector from "./SuperAdminStatusSelector";
import ParticularComplaintSkeleton from "@/components/UI_Components/Standard_Components/skeletons/ParticularComplaintSkeleton";

const ParticularComplaint = ({ complaint, unread }) => {
  
  const [timeline, setTimeline] = useState(complaint?.timeline || []);
  const [status, setStatus] = useState(
    complaint?.status_of_client || "Pending"
  );
  const [superAdminStatus, setSuperAdminStatus] = useState(
    complaint?.authorizationStatus || "Pending"
  );
  const [actionMessage, setActionMessage] = useState(
    complaint?.actionMessage || []
  );
  const [rejectReason, setRejectionReason] = useState(
    complaint?.authoriseRejectionReason || []
  );
  const [resetForm, setResetForm] = useState(false);
  const [unseenMessageCount, setUnseenMessageCount] = useState(unread || 0);
  const [socketConnected, setSocketConnected] = useState(false);
  const { socket, isConnected, connectionError, reconnect } = useSocket();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { userRole, markAsRead } = useNotificationStore();
  const hasJoinedRoomRef = useRef(false);
  const { token } = useAccessToken();

  // Helper function to check if an item with the same ID already exists
  const isDuplicate = (array, newItem, idField = "_id") => {
    if (!newItem || !newItem[idField]) return false;
    return array.some((item) => item[idField] === newItem[idField]);
  };

  const handleStatusChange = (newEvent) => {
    if (!newEvent) return;

    // Ensure we're adding a valid timeline event
    if (typeof newEvent === "object" && newEvent.status_of_client) {
      setTimeline((prev) => {
        const prevArray = Array.isArray(prev) ? prev : [];
        // Check for duplicate timeline events
        if (newEvent._id && isDuplicate(prevArray, newEvent)) {
          return prev;
        }
        return [newEvent, ...prevArray];
      });
    } else if (typeof newEvent === "string") {
      // If newEvent is just a status string, create a full event object
      const timelineEvent = {
        status_of_client: newEvent,
        timestamp: new Date().toISOString(),
        message: `Status changed to ${newEvent}`,
        _id: `temp_${Date.now()}`, // Add temporary ID to prevent duplicates
      };
      setTimeline((prev) => [
        timelineEvent,
        ...(Array.isArray(prev) ? prev : []),
      ]);
    }
  };

  // Update socket connected state when connection status changes
  useEffect(() => {
    setSocketConnected(isConnected);

    // If we just connected and haven't joined the room yet, join it
    if (isConnected && !hasJoinedRoomRef.current && complaint?._id) {
      socket.emit("joinComplaintRoom", `complaint_${complaint._id}`);
      hasJoinedRoomRef.current = true;
    }
  }, [isConnected, socket, complaint?._id]);

  // Main socket effect to handle events
  useEffect(() => {
    if (!socket || !complaint?._id || !isConnected) return;

    // Only join the room once
    if (!hasJoinedRoomRef.current) {
      socket.emit("joinComplaintRoom", `complaint_${complaint._id}`);
      hasJoinedRoomRef.current = true;
    }

    const handleUnseenCount = (data) => {
      try {
        if (!data || !data.counts) {
          console.warn("Invalid unseen counts data:", data);
          return;
        }

        const roleMap = {
          user: "user",
          "SUB ADMIN": "subadmin",
          "SUPER ADMIN": "superadmin",
          ADMIN: "admin",
        };

        const currentUserRole = roleMap[userRole];
        if (!currentUserRole) {
          console.warn(`Unknown user role: ${userRole}`);
          return;
        }

        const unseenMessages = data.counts[currentUserRole];
        if (typeof unseenMessages === "number") {
          setUnseenMessageCount(unseenMessages);
        }
      } catch (error) {
        console.error("Error handling unseen count update:", error);
      }
    };

    const handleStatusChange = (update) => {
      try {
        if (!update) {
          console.warn("Received empty status update");
          return;
        }

        // Update status
        if (update.status_of_client) {
          setStatus(update.status_of_client);
        }
        // IMPORTANT: Add this condition to handle Super Admin status reset
        if (update.changeSuperAdminStatus !== undefined) {
          setSuperAdminStatus(update.changeSuperAdminStatus);
        }

        // Add to timeline if there's a timeline event
        if (update.timelineEvent) {
          setTimeline((prev) => {
            const prevArray = Array.isArray(prev) ? prev : [];
            // Check for duplicate timeline events
            if (isDuplicate(prevArray, update.timelineEvent)) {
              return prev;
            }
            return [update.timelineEvent, ...prevArray];
          });
        }

        // Handle actionMessage updates with duplicate prevention
        if (update.actionMessage) {
          setActionMessage((prev) => {
            // Ensure prev is an array
            const prevArray = Array.isArray(prev) ? prev : [];

            // Check if this actionMessage already exists
            if (isDuplicate(prevArray, update.actionMessage)) {
              return prev;
            }

            // Add the new actionMessage to the beginning of the array
            return [update.actionMessage, ...prevArray];
          });
        }

        // Handle rejection reason updates
        if (update.rejectionReason) {
          setRejectionReason((prev) => {
            const prevArray = Array.isArray(prev) ? prev : [];
            // For rejection reasons, we might not have IDs, so check content
            if (prevArray.includes(update.rejectionReason)) {
              return prev;
            }
            return [...prevArray, update.rejectionReason];
          });
        }

        if (update.resetActionTakenForm) {
          setResetForm(true);
        }

        // if (update.changeSuperAdminStatus == "Pending") {
        //   setSuperAdminStatus(update.changeSuperAdminStatus);
        // }
      } catch (error) {
        console.error("Error handling status change:", error);
      }
    };

    // Register event handlers
    socket.on("unseen_counts_update", handleUnseenCount);
    socket.on("status_change", handleStatusChange);

    // Cleanup function
    return () => {
      if (socket) {
        socket.off("status_change", handleStatusChange);
        socket.off("unseen_counts_update", handleUnseenCount);

        // Leave the room when component unmounts
        socket.emit("leaveComplaintRoom", `complaint_${complaint._id}`);
        hasJoinedRoomRef.current = false;
      }
    };
  }, [socket, complaint?._id, userRole, isConnected]);

  // Handle notification decrement from URL params
  useEffect(() => {
    const notificationId = searchParams.get("notificationId");
    if (notificationId && token) {
      // Optional: Update backend
      const endpoint =
        userRole === "user"
          ? "/api/user-notifications/mark-as-read"
          : "/api/client-notifications/client-mark-as-read";

      markNotificationAsRead(notificationId, token, endpoint).then(() =>
        markAsRead(notificationId)
      );

      // Clean up URL parameters
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("notificationId");
      router.replace(`?${newParams.toString()}`, { scroll: false });
    }
  }, [searchParams, router, userRole, token]);
  if (token == null) {
    return <ParticularComplaintSkeleton />;
  }

  return (
    <div className=" min-h-screen bg-primary/10 rounded-none transition-colors duration-300  flex flex-col">
      {/* Socket Connection Status */}
      {!socketConnected && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 mb-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
            <p className="text-sm text-amber-700 dark:text-amber-400">
              Socket connection issue. Some real-time updates may not work.
              <button
                onClick={reconnect}
                className="ml-2 text-amber-800 dark:text-amber-300 underline hover:text-amber-900"
              >
                Reconnect
              </button>
            </p>
          </div>
        </div>
      )}

      <div className="rounded-none space-y-3">
        {/* Main Container */}
        <div className=" dark:bg-dark   dark:border-primary-dark ">
          {/* Header Section */}
          <div className="  pb-3  ">
            <ComplaintHeader complaint={complaint} userRole={userRole} />
          </div>

          {/* Content Grid */}
          <div className="p-3">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
              {/* Main Content Area */}
              <div className="lg:col-span-2 space-y-8">
                {/* Complaint Details Card */}
                <div className="  rounded-xl bg-white shadow-sm  dark:border-secondary-dark transition-colors duration-200 hover:border-primary-light">
                  <ComplaintDetails complaint={complaint} />
                </div>

                {/* Evidence Gallery Section */}
                <div className="  rounded-xl bg-white shadow-sm  dark:border-secondary-dark transition-colors duration-200 hover:border-light">
                  <EvidenceGallery evidence={complaint?.evidence || []} />
                </div>

                {/* Notes Section */}
                {userRole !== "user" &&
                  userRole !== "BIGHIL" &&
                  userRole !== "ADMIN" && (
                    <div className="rounded-xl shadow-sm  dark:border-secondary-dark transition-colors duration-200 ">
                      <NotesSection
                        notes={complaint?.notes || []}
                        complaintId={complaint?._id}
                      />
                    </div>
                  )}
                <div className="flex gap-6 justify-between  rounded-xl shadow-sm  dark:border-secondary-dark transition-colors duration-200 hover:border-dialog_inside_border_color hover:rounded-xl">
                  {userRole == "SUB ADMIN" && (
                    <StatusSelector
                      status={status}
                      setStatus={setStatus}
                      complaintId={complaint?._id}
                      onStatusChange={handleStatusChange}
                      userRole={userRole}
                    />
                  )}
                  {userRole == "SUPER ADMIN" && (
                    <SuperAdminStatusSelector
                      complaintId={complaint?._id}
                      superAdminStatus={superAdminStatus}
                      setSuperAdminStatus={setSuperAdminStatus}
                      token={token}
                    />
                  )}
                </div>
                {/* Action Taken Section */}
                <div className="  rounded-xl shadow-sm  dark:border-secondary-dark transition-colors duration-200 hover:border-dialog_inside_border_color">
                  <ActionTaken
                    complaintId={complaint?._id}
                    onStatusChange={handleStatusChange}
                    status={status}
                    setStatus={setStatus}
                    actionMessage={actionMessage}
                    rejectionReason={rejectReason}
                    resetForm={resetForm}
                  />
                </div>
              </div>

              {/* Sidebar Content */}
              <div className="space-y-3">
                {/* Timeline Card */}
                <div className="  rounded-xl shadow-sm  dark:border-secondary-dark transition-colors duration-200 hover:border-dialog_inside_border_color">
                  <Timeline events={timeline} userRole={userRole} />
                </div>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className=" dark:border-success mt-8 bg-background-secondary ">
            <div className="p-3">
              <ChatInterface
                complaintId={complaint?._id}
                unseenMessageCount={unseenMessageCount}
                isSocketConnected={socketConnected}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticularComplaint;
