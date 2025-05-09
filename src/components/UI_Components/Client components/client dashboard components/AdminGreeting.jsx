"use client";

import React, { useState, useEffect } from "react";
import useNotificationStore from "@/store/notificationStore";
import { useTimeFormat } from "@/custom hooks/useTimeFormat";
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
    <div className="mb-4 relative overflow-hidden transition-all duration-300 group">
      <div className="bg-white dark:bg-surface-dark rounded-2xl   p-3 transition-all duration-300 ">
        {/* <div className="absolute top-0 left-0 w-10 h-10 rounded-tr-2xl bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/30 dark:to-secondary-DEFAULT/30 rounded-br-3xl" /> */}

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-center justify-between gap-3">
          <div className="flex-1 space-y-2">
            <div className="flex items-center md:flex-row flex-col gap-2">
              <TimeIcon hours={currentTime.getHours()} />
              <h1 className="text-xl font-bold text-text_color dark:text-text-light tracking-tight">
                {greeting},{" "}
              </h1>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/90 bg-clip-text text-transparent ">
                {userRole?.replace("_", " ") || "Admin"}
              </h1>
            </div>

            <p className="text-text_color dark:text-text-muted max-w-2xl ">
              <WelcomeMessage userRole={userRole} />
            </p>
          </div>

          <TimeDisplay
            time={formatTime(currentTime)}
            date={formatDate(currentTime)}
          />
        </div>

        <div className="mt-3">
          <DayProgressBar currentTime={currentTime} />
        </div>
      </div>
    </div>
  );
};

export default AdminGreeting;
