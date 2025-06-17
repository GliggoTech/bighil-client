// src/hooks/useTimeFormat.js
"use client";
import { useMemo } from "react";

export const useTimeFormat = () => {
  const formatters = useMemo(
    () => ({
      time: new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }),
      date: new Intl.DateTimeFormat("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }),
    }),
    []
  );

  const formatTime = (date) => {
    if (!date) return "--:--:-- --";
    return formatters.time.format(date);
  };

  const formatDate = (date) => {
    if (!date) return "--/--/----";
    // Format as MM/DD/YYYY
    const formatted = formatters.date.format(date);
    return formatted;
  };

  return { formatTime, formatDate };
};
