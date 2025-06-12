// utils/tabCloseHandler.js
import { getBackendUrl } from "@/lib/getBackendUrl";

const url = getBackendUrl();

// Function to call logout API directly (client-side) - for immediate logout without dialog
export const callDirectLogout = async (accessToken) => {
  try {
    if (!accessToken) {
      console.warn("No access token available for logout");
      return;
    }

    const logoutData = {
      action: "logout",
      timestamp: new Date().toISOString(),
    };

    if (navigator.sendBeacon) {
      // Use sendBeacon for reliable API call during page unload
      const headers = new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      });

      const blob = new Blob([JSON.stringify(logoutData)], {
        type: "application/json",
      });

      // Note: sendBeacon doesn't support custom headers, so we'll use fetch with keepalive
      const success = await fetch(`${url}/api/client-auth/client-logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "User-Agent": navigator.userAgent,
        },
        body: JSON.stringify(logoutData),
        keepalive: true, // This ensures the request completes even if page is closing
      });

      console.log("Direct logout call made");
    }
  } catch (error) {
    console.error("Error in direct logout:", error);
  }
};

// Alternative handler that calls logout immediately without dialog
export const setupDirectLogoutHandler = (accessToken) => {
  const handleBeforeUnload = (event) => {
    // Call logout API immediately
    callDirectLogout(accessToken);

    // Optional: Show browser confirmation
    event.preventDefault();
    return (event.returnValue = "You will be logged out for security reasons.");
  };

  // Add event listener
  window.addEventListener("beforeunload", handleBeforeUnload);

  // Return cleanup function
  return () => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };
};
