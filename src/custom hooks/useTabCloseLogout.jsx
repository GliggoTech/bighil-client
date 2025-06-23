"use client";
import { useEffect } from "react";
import { getBackendUrl } from "@/lib/getBackendUrl";

export default function TabCloseLogout() {
  useEffect(() => {
    let isRefresh = false;
    const url = `${getBackendUrl()}/api/client-auth/client-beacon-logout`;

    // Detect refresh attempts
    const handleBeforeUnload = (e) => {
      isRefresh = e.ctrlKey || e.keyCode === 116 || e.keyCode === 82;
    };

    // Handle tab close
    const handleUnload = () => {
      if (!isRefresh) {
        try {
          const blob = new Blob([JSON.stringify({})], {
            type: "application/json",
          });

          if (navigator.sendBeacon) {
            navigator.sendBeacon(url, blob);
          } else {
            fetch(url, {
              method: "POST",
              body: blob,
              keepalive: true,
              credentials: "include",
            });
          }
        } catch (e) {
          console.error("Beacon error:", e);
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
