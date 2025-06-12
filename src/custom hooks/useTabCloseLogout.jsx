"use client";
import { getBackendUrl } from "@/lib/getBackendUrl";
import { useEffect } from "react";

const url = getBackendUrl();

export default function TabCloseLogout() {
  useEffect(() => {
    let isRefreshing = false;
    let lastActivity = Date.now();

    // Track user activity to determine if they're actively using the page
    const updateActivity = () => {
      lastActivity = Date.now();
    };

    // Method 1: Track refresh attempts
    const handleBeforeUnload = (event) => {
      // Check if it's likely a refresh (Ctrl+R, F5, or navigation within same origin)
      if (event.ctrlKey || event.keyCode === 116 || event.keyCode === 82) {
        isRefreshing = true;
        return;
      }

      // Check if user was recently active (less than 5 seconds ago)
      // If not active, it's likely a genuine tab close
      const timeSinceActivity = Date.now() - lastActivity;
      if (timeSinceActivity < 5000) {
        isRefreshing = true;
        return;
      }
    };

    const handleUnload = () => {
      // Only logout if it's not a refresh
      if (!isRefreshing) {
        const apiUrl = `${url}/api/client-auth/client-beacon-logout`;
        const blob = new Blob([JSON.stringify({})], {
          type: "application/json",
        });

        if (navigator.sendBeacon) {
          navigator.sendBeacon(apiUrl, blob);
        } else {
          fetch(apiUrl, {
            method: "POST",
            body: blob,
            keepalive: true,
          }).catch(() => {
            // Silent fail - user is leaving anyway
          });
        }
      }
    };

    // Method 2: Use visibility API to better detect tab close vs refresh
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // Set a flag that we'll check later
        sessionStorage.setItem("tabHidden", Date.now().toString());
      }
    };

    const handlePageShow = (event) => {
      // Clear refresh flag when page shows (including back/forward navigation)
      isRefreshing = false;
      sessionStorage.removeItem("tabHidden");
    };

    // Method 3: Alternative approach using Page Visibility API
    const handlePageHide = () => {
      const hiddenTime = sessionStorage.getItem("tabHidden");
      const now = Date.now();

      // If the page was hidden recently (within 100ms), it's likely a refresh
      if (hiddenTime && now - parseInt(hiddenTime) < 100) {
        return; // Don't logout on refresh
      }

      // Check if it's a same-origin navigation (refresh/internal navigation)
      if (window.performance && window.performance.navigation) {
        if (window.performance.navigation.type === 1) {
          // TYPE_RELOAD
          return; // Don't logout on refresh
        }
      }

      // Logout for genuine tab close
      const apiUrl = `${url}/api/client-auth/client-beacon-logout`;
      const blob = new Blob([JSON.stringify({})], { type: "application/json" });

      if (navigator.sendBeacon) {
        navigator.sendBeacon(apiUrl, blob);
      }
    };

    // Add activity listeners
    const activityEvents = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
      "click",
    ];
    activityEvents.forEach((event) => {
      document.addEventListener(event, updateActivity, { passive: true });
    });

    // Add main event listeners
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("pageshow", handlePageShow);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      // Cleanup
      activityEvents.forEach((event) => {
        document.removeEventListener(event, updateActivity);
      });
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("pageshow", handlePageShow);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null;
}
