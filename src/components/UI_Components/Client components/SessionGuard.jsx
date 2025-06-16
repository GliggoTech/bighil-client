"use client";
import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

import useNotificationStore from "@/store/notificationStore";
import { clientLogout } from "@/app/actions/client.actions";
import { useBeforeUnload } from "@/custom hooks/useBeforeUnload";

export default function SessionGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
 
  const { userId, clearCurrentUser } = useNotificationStore();
  const { LogoutConfirmationDialog, performLogout } = useBeforeUnload();
  const inactivityTimer = useRef(null);
  const lastActivity = useRef(Date.now());

  // Check if user is on a protected route
  const isProtectedRoute =
    pathname?.startsWith("/client/client-dashboard") ||
    pathname?.startsWith("/client/client-complaints") ||
    pathname?.startsWith("/client/client-myAccount") ||
    pathname?.startsWith("/client/client-notifications") ||
    pathname?.startsWith("/client/client-setting");

  // Reset inactivity timer
  const resetInactivityTimer = () => {
    lastActivity.current = Date.now();

    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }

    // Set inactivity timeout (5 minutes)
    inactivityTimer.current = setTimeout(() => {
      handleInactivityLogout();
    }, 5 * 60 * 1000); // 5 minutes
  };

  const handleInactivityLogout = async () => {
    if (userId && isProtectedRoute) {
      try {
        await clientLogout();
        clearCurrentUser();
        router.push("/client/client-login?reason=inactivity");
      } catch (error) {
        console.error("Inactivity logout error:", error);
      }
    }
  };

  useEffect(() => {
    if (!isProtectedRoute || !userId) return;

    // Activity events to track
    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
      "click",
      "focus",
    ];

    // Reset timer on user activity
    const handleActivity = () => {
      resetInactivityTimer();
    };

    // Add event listeners
    events.forEach((event) => {
      document.addEventListener(event, handleActivity, true);
    });

    // Initialize timer
    resetInactivityTimer();

    // Cleanup
    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity, true);
      });

      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
  }, [userId, isProtectedRoute]);

  // Handle page focus/blur for tab switching
  useEffect(() => {
    if (!isProtectedRoute || !userId) return;

    let blurTimeout;

    const handleFocus = () => {
      if (blurTimeout) {
        clearTimeout(blurTimeout);
        blurTimeout = null;
      }
    };

    const handleBlur = () => {
      // Set a timeout to logout if user doesn't return within 2 minutes
      blurTimeout = setTimeout(async () => {
        if (userId) {
          await performLogout();
        }
      }, 2 * 60 * 1000); // 2 minutes
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
      if (blurTimeout) {
        clearTimeout(blurTimeout);
      }
    };
  }, [userId, isProtectedRoute, performLogout]);

  // Check session validity on mount and route changes
  useEffect(() => {
    if (!isProtectedRoute) return;

    const checkSession = async () => {
      try {
        // You can add an API call here to validate session
        const response = await fetch("/api/validate-session", {
          credentials: "include",
        });


        if (!response.ok) {
          clearCurrentUser();
          router.push("/client/client-login?reason=session-expired");
        }
      } catch (error) {
        console.error("Session validation error:", error);
      }
    };

    checkSession();
  }, [pathname, isProtectedRoute]);

  return (
    <>
      {children}
      <LogoutConfirmationDialog />
    </>
  );
}
