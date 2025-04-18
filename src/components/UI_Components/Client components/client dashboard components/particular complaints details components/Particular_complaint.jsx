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

const ParticularComplaint = ({ complaint, unread }) => {
  const [timeline, setTimeline] = useState(complaint?.timeline || []);
  const [status, setStatus] = useState(
    complaint?.status_of_client || "Pending"
  );
  const [unseenMessageCount, setUnseenMessageCount] = useState(unread || 0);
  const [socketConnected, setSocketConnected] = useState(false);
  const { socket, isConnected, connectionError, reconnect } = useSocket();
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasDecrementedRef = useRef(false);
  const { userRole, decreaseNotificationCount } = useNotificationStore();
  const hasJoinedRoomRef = useRef(false);

  const handleStatusChange = (newEvent) => {
    if (!newEvent) return;

    // Ensure we're adding a valid timeline event
    if (typeof newEvent === "object" && newEvent.status_of_client) {
      setTimeline((prev) => [newEvent, ...(Array.isArray(prev) ? prev : [])]);
    } else if (typeof newEvent === "string") {
      // If newEvent is just a status string, create a full event object
      const timelineEvent = {
        status_of_client: newEvent,
        timestamp: new Date().toISOString(),
        message: `Status changed to ${newEvent}`,
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
      console.log(`Joining complaint room: complaint_${complaint._id}`);
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

        // Add to timeline if there's a timeline event
        if (update.timelineEvent) {
          setTimeline((prev) => [
            update.timelineEvent,
            ...(Array.isArray(prev) ? prev : []),
          ]);
        }
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
    if (
      searchParams.get("notificationDecremented") === "true" &&
      !hasDecrementedRef.current
    ) {
      hasDecrementedRef.current = true;
      decreaseNotificationCount();

      // Clean up the URL parameter
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("notificationDecremented");
      router.replace(`?${newParams.toString()}`, { scroll: false });
    }
  }, [searchParams, decreaseNotificationCount, router]);

  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark transition-colors duration-300">
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

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Main Container */}
        <div className="bg-background-primary dark:bg-background-dark rounded-2xl shadow-lg border border-border-light dark:border-primary-dark overflow-hidden">
          {/* Header Section */}
          <div className="border-b border-border-light dark:border-primary-dark pb-6 bg-background-secondary dark:bg-surface-dark">
            <ComplaintHeader complaint={complaint} userRole={userRole} />
          </div>

          {/* Content Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content Area */}
              <div className="lg:col-span-2 space-y-8">
                {/* Complaint Details Card */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-secondary-dark transition-colors duration-200 hover:border-primary-light">
                  <ComplaintDetails complaint={complaint} />
                </div>

                {/* Evidence Gallery Section */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-secondary-dark transition-colors duration-200 hover:border-primary-light">
                  <EvidenceGallery evidence={complaint?.evidence || []} />
                </div>

                {/* Notes Section */}
                {userRole !== "user" && (
                  <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-secondary-dark transition-colors duration-200 hover:border-accent-warning">
                    <NotesSection
                      notes={complaint?.notes || []}
                      complaintId={complaint?._id}
                    />
                  </div>
                )}
              </div>

              {/* Sidebar Content */}
              <div className="space-y-6">
                {/* Timeline Card */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-secondary-dark transition-colors duration-200 hover:border-accent-info">
                  <Timeline events={timeline} />
                </div>

                <div className="bg-surface-light w-fit dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-secondary-dark transition-colors duration-200 hover:border-accent-success hover:rounded-xl">
                  <StatusSelector
                    status={status}
                    setStatus={setStatus}
                    complaintId={complaint?._id}
                    onStatusChange={handleStatusChange}
                    userRole={userRole}
                  />
                </div>

                <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-secondary-dark transition-colors duration-200 hover:border-accent-danger">
                  <ActionTaken
                    complaintId={complaint?._id}
                    onStatusChange={handleStatusChange}
                    status={status}
                    setStatus={setStatus}
                    actionMessage={complaint?.actionMessage || ""}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="border-t border-border-light dark:border-accent-success mt-8 bg-background-secondary dark:bg-surface-dark">
            <div className="p-6">
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
