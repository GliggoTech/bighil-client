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

const ParticularComplaint = ({ complaint, unread }) => {
  const [timeline, setTimeline] = useState(complaint.timeline);
  const [status, setStatus] = useState(complaint.status_of_client);
  const [unseenMessageCount, setUnseenMessageCount] = useState(unread);
  const { socket } = useSocket();
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasDecrementedRef = useRef(false);
  const { userRole, decreaseNotificationCount } = useNotificationStore();
  console.log("userRole", userRole);
  const handleStatusChange = (newEvent) => {
    console.log("handleStatusChange", newEvent);
    setTimeline((prev) => [newEvent, ...prev]);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      return;
    }
  }, []);
  useEffect(() => {
    if (!socket || !complaint?._id) return;

    const handleUnseenCount = (data) => {
      const roleMap = {
        user: "user",
        "SUB ADMIN": "subadmin",
        "SUPER ADMIN": "superadmin",
        ADMIN: "admin",
      };

      const currentUserRole = roleMap[userRole];
      const unseenMessages = data.counts[currentUserRole];
      setUnseenMessageCount(unseenMessages);
    };

    socket.emit("joinComplaintRoom", `complaint_${complaint._id}`);
    socket.on("unseen_counts_update", handleUnseenCount);
    socket.on("status_change", (update) => {
      setStatus(update.status_of_client);
      setTimeline((prev) => [update.timelineEvent, ...prev]);
    });

    return () => {
      socket.off("status_change");
      socket.off("unseen_counts_update", handleUnseenCount);
    };
  }, [
    socket,
    complaint?._id,
    userRole,
    unseenMessageCount,
    handleStatusChange,
  ]);

  useEffect(() => {
    if (
      searchParams.get("notificationDecremented") === "true" &&
      !hasDecrementedRef.current
    ) {
      hasDecrementedRef.current = true;
      decreaseNotificationCount();

      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("notificationDecremented");
      router.replace(`?${newParams.toString()}`, { scroll: false });
    }
  }, [searchParams, decreaseNotificationCount, router]);

  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark transition-colors duration-300">
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
                  <EvidenceGallery evidence={complaint.evidence} />
                </div>

                {/* Notes Section */}
                {userRole !== "user" && (
                  <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-secondary-dark transition-colors duration-200 hover:border-accent-warning">
                    <NotesSection
                      notes={complaint.notes}
                      complaintId={complaint._id}
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

                {/* Status Selector */}
                {userRole !== "user" && userRole !== "SUB ADMIN" && (
                  <div className="bg-surface-light w-fit dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-secondary-dark transition-colors duration-200 hover:border-accent-success hover:rounded-xl">
                    <StatusSelector
                      status={status}
                      setStatus={setStatus}
                      complaintId={complaint._id}
                      onStatusChange={handleStatusChange}
                    />
                  </div>
                )}

                {/* Action Taken Section */}
                {((userRole !== "user" && userRole !== "SUB ADMIN") ||
                  status === "Resolved") && (
                  <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-secondary-dark transition-colors duration-200 hover:border-accent-danger">
                    <ActionTaken
                      complaintId={complaint._id}
                      onStatusChange={handleStatusChange}
                      status={status}
                      setStatus={setStatus}
                      actionMessage={complaint.actionMessage}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="border-t border-border-light dark:border-accent-success mt-8 bg-background-secondary dark:bg-surface-dark">
            <div className="p-6">
              <ChatInterface
                complaintId={complaint._id}
                unseenMessageCount={unseenMessageCount}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticularComplaint;
