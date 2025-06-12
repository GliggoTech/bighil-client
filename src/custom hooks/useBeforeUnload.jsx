"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { clientLogout } from "@/app/actions/client.actions";
import useNotificationStore from "@/store/notificationStore";

export function useBeforeUnload() {
  const [showDialog, setShowDialog] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);
  const router = useRouter();
  const { clearCurrentUser } = useNotificationStore();
  const isLoggingOut = useRef(false);

  useEffect(() => {
    let timeoutId;

    const handleBeforeUnload = (e) => {
      // Only show confirmation if user is authenticated
      const hasToken = document.cookie.includes("access_token");
      if (!hasToken || isLoggingOut.current) return;

      // Standard beforeunload confirmation
      e.preventDefault();
      e.returnValue = "Are you sure you want to leave? You will be logged out.";
      return "Are you sure you want to leave? You will be logged out.";
    };

    const handleUnload = async () => {
      // Attempt to logout when page is actually unloading
      const hasToken = document.cookie.includes("access_token");
      if (hasToken && !isLoggingOut.current) {
        // Use sendBeacon for reliable logout on page unload
        navigator.sendBeacon(
          "/api/logout-beacon",
          JSON.stringify({ action: "logout" })
        );
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // Page is being hidden (tab switch, minimize, etc.)
        const hasToken = document.cookie.includes("access_token");
        if (hasToken && !isLoggingOut.current) {
          // Set a timeout to logout if page stays hidden
          timeoutId = setTimeout(() => {
            performLogout();
          }, 5000); // 5 second delay
        }
      } else if (document.visibilityState === "visible") {
        // Page is visible again, cancel logout timeout
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
      }
    };

    // Add event listeners
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const performLogout = async () => {
    if (isLoggingOut.current) return;

    isLoggingOut.current = true;
    try {
      await clientLogout();
      clearCurrentUser();
      router.push("/client/client-login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      isLoggingOut.current = false;
    }
  };

  const showLogoutConfirmation = () => {
    setShowDialog(true);
  };

  const handleConfirmLogout = async () => {
    setShowDialog(false);
    await performLogout();
  };

  const handleCancelLogout = () => {
    setShowDialog(false);
    setPendingNavigation(null);
  };

  const LogoutConfirmationDialog = () => (
    <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <span className="text-amber-500">⚠️</span>
            Confirm Logout
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-600">
            You are about to leave the application. For security reasons, you
            will be automatically logged out. Do you want to continue?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={handleCancelLogout}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700"
          >
            Stay Logged In
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmLogout}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Logout & Leave
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return {
    showLogoutConfirmation,
    LogoutConfirmationDialog,
    performLogout,
  };
}
