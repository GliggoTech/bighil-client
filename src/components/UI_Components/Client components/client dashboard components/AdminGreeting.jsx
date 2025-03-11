"use client";

import React, { useState, useEffect } from "react";
import useNotificationStore from "@/store/notificationStore";
import { useTimeFormat } from "@/custome hooks/useTimeFormat";
import { TimeIcon } from "./Admin greeting components/TimeIcon";
import { WelcomeMessage } from "./Admin greeting components/WelcomeMessage";
import { TimeDisplay } from "./Admin greeting components/TimeDisplay";
import { DayProgressBar } from "./Admin greeting components/ProgressBar";
import { SkeletonAdminGreeting } from "../../Standard_Components/skeletons/SkeletonAdminGreeting";

const AdminGreeting = () => {
  const { userRole } = useNotificationStore();
  // Initialize with null to prevent hydration mismatch
  const [currentTime, setCurrentTime] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  const { formatTime, formatDate } = useTimeFormat();

  // Handle client-side initialization
  useEffect(() => {
    setIsMounted(true);
    setCurrentTime(new Date());
  }, []);

  // Update time only after component is mounted
  useEffect(() => {
    if (!isMounted) return;

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [isMounted]);

  // Update greeting only when currentTime changes and component is mounted
  useEffect(() => {
    if (!currentTime || !isMounted) return;

    const hours = currentTime.getHours();
    setGreeting(
      hours >= 5 && hours < 12
        ? "Good Morning"
        : hours >= 12 && hours < 18
        ? "Good Afternoon"
        : "Good Evening"
    );
  }, [currentTime, isMounted]);

  // Don't render until client-side hydration is complete
  if (!isMounted || !currentTime) {
    return <SkeletonAdminGreeting />; // Or return a loading skeleton
  }

  return (
    <div className="mb-8 relative overflow-hidden transition-all duration-300 group">
      <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-lg border border-border-light dark:border-border-dark p-6 backdrop-blur-lg transition-all duration-300 hover:shadow-xl">
        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-primary-light/20 to-secondary-light/20 dark:from-primary/30 dark:to-secondary-DEFAULT/30 rounded-br-3xl" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <TimeIcon hours={currentTime.getHours()} />
              <h1 className="text-3xl font-bold text-text-primary dark:text-text-light tracking-tight">
                {greeting},{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent capitalize">
                  {userRole?.replace("_", " ") || "Admin"}
                </span>
              </h1>
            </div>

            <p className="text-text-secondary dark:text-text-muted max-w-2xl">
              <WelcomeMessage userRole={userRole} />
            </p>
          </div>

          <TimeDisplay
            time={formatTime(currentTime)}
            date={formatDate(currentTime)}
          />
        </div>

        <div className="mt-6">
          <DayProgressBar currentTime={currentTime} />
        </div>
      </div>
    </div>
  );
};

export default AdminGreeting;
