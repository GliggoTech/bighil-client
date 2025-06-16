// components/UI_Components/Standard_Components/LogoutConfirmationDialog.jsx
"use client";

import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { clientLogout } from "@/app/actions/client.actions";
import { useRouter } from "next/navigation";

export default function LogoutConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  accessToken,
}) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // Call your existing server action
      const result = await clientLogout();

      if (result.success) {
      
        onConfirm?.();

        // Redirect to login page
        router.push("/client-login");

        // Or refresh the page to clear all state
        // window.location.reload();
      } else {
        console.error("Logout failed:", result.message);
        // Show error message or handle failure
        alert("Logout failed: " + result.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred during logout");
    } finally {
      setIsLoggingOut(false);
      onClose(); // Close dialog regardless of outcome
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to close this tab? You will be logged out of
            your account for security reasons.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel} disabled={isLoggingOut}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {isLoggingOut ? (
              <>
                <span className="mr-2">Logging out...</span>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </>
            ) : (
              "Logout & Close Tab"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
