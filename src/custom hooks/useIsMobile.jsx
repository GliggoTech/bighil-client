// hooks/useIsMobile.js
"use client";

import { useState, useEffect } from "react";

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => {
    // Check if window is available (client-side)
    if (typeof window !== "undefined") {
      return window.innerWidth < breakpoint;
    }
    // Default value for SSR
    return false;
  });

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, [breakpoint]);

  return isMobile;
}
