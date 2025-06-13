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
  const [currentTime, setCurrentTime] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  const { formatTime, formatDate } = useTimeFormat();

  // Handle client-side initialization
  useEffect(() => {
    setIsMounted(true);
    const now = new Date();
    setCurrentTime(now);

    // Set initial greeting immediately
    const hours = now.getHours();
    setGreeting(
      hours >= 5 && hours < 12
        ? "Good Morning"
        : hours >= 12 && hours < 18
        ? "Good Afternoon"
        : "Good Evening"
    );
  }, []);

  // Update time only after component is mounted
  useEffect(() => {
    if (!isMounted) return;

    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      // Update greeting when time changes
      const hours = now.getHours();
      setGreeting(
        hours >= 5 && hours < 12
          ? "Good Morning"
          : hours >= 12 && hours < 18
          ? "Good Afternoon"
          : "Good Evening"
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [isMounted]);

  // Show skeleton during SSR and initial hydration
  if (!isMounted || !currentTime) {
    return <SkeletonAdminGreeting />;
  }

  return (
    <div className="mb-4 relative overflow-hidden transition-all duration-300 group">
      <div className="bg-white dark:bg-surface-dark rounded-2xl p-3 transition-all duration-300">
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-center justify-between gap-1">
          <div className="flex-1 space-y-2">
            <div className="flex items-center md:flex-row flex-col gap-2">
              <TimeIcon hours={currentTime.getHours()} />
              <div className="flex gap-1 items-center">
                <h1 className="text-xl font-bold text-text_color ">
                  {greeting},
                </h1>
                <h1 className="text-xl mt-1 font-bold bg-gradient-to-r from-primary to-primary/90 bg-clip-text text-transparent">
                  {userRole?.replace("_", " ") || "Admin"}
                </h1>
              </div>
            </div>

            <p className="text-text_color dark:text-text-muted max-w-2xl">
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
