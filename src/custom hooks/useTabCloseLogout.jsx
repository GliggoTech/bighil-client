"use client";

import { useEffect } from "react";

export default function TabCloseLogout() {
  useEffect(() => {
    let isRefresh = false;

    // Detect refresh attempts
    const handleBeforeUnload = (e) => {
      isRefresh = e.ctrlKey || e.keyCode === 116 || e.keyCode === 82;
    };

    // Handle tab close
    const handleUnload = () => {
      if (!isRefresh) {
        try {
          // Call clientLogout server action
          // Note: This needs to be handled differently since server actions
          // can't be called directly in unload events

          // Option 1: Use sendBeacon with a custom endpoint that calls clientLogout
          const logoutEndpoint = `/api/logout-beacon`; // You'll need to create this

          const blob = new Blob([JSON.stringify({})], {
            type: "application/json",
          });

          if (navigator.sendBeacon) {
            navigator.sendBeacon(logoutEndpoint, blob);
          } else {
            fetch(logoutEndpoint, {
              method: "POST",
              body: blob,
              keepalive: true,
              credentials: "include",
            });
          }
        } catch (e) {
          console.error("Logout beacon error:", e);
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, []);

  return null;
}
