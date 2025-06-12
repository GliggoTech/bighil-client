"use client";
import { getBackendUrl } from "@/lib/getBackendUrl";
import { useEffect } from "react";

const url = getBackendUrl();

export default function TabCloseLogout() {
  useEffect(() => {
    const handleTabClose = (event) => {
      const apiUrl = `${url}/api/client-auth/client-beacon-logout`;
      const blob = new Blob([JSON.stringify({})], { type: "application/json" });

      if (navigator.sendBeacon) {
        navigator.sendBeacon(apiUrl, blob);
      } else {
        // Fallback for browsers that don't support sendBeacon
        fetch(apiUrl, {
          method: "POST",
          body: blob,
          keepalive: true,
        }).catch(() => {
          // Silent fail - user is leaving anyway
        });
      }
    };

    window.addEventListener("beforeunload", handleTabClose);
    window.addEventListener("pagehide", handleTabClose); // Better for mobile

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
      window.removeEventListener("pagehide", handleTabClose);
    };
  }, []);

  return null; // This component renders nothing
}
