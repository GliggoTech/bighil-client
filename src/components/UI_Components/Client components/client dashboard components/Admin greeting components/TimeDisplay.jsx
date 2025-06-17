"use client";
import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";

export const TimeDisplay = ({ time, date }) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null; // Prevents SSR mismatch

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-light to-light/20 dark:from-dark dark:to-background-dark rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="text-xl md:text-2xl font-semibold text-text_color dark:text-text-light tracking-tight">
        {time}
      </div>
      <div className="flex items-center mt-2 text-sm text-text-secondary dark:text-text-muted">
        <Calendar className="h-3.5 w-3.5 mr-1.5 text-primary" />
        {date}
      </div>
    </div>
  );
};
