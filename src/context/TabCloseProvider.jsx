"use client";

import LogoutConfirmationDialog from "@/components/UI_Components/Standard_Components/LogoutConfirmationDialog";
import useAccessToken from "@/custom hooks/useAccessToken";
import { useState, useEffect, createContext, useContext } from "react";

const TabCloseContext = createContext();

export const useTabClose = () => {
  const context = useContext(TabCloseContext);
  if (!context) {
    throw new Error("useTabClose must be used within TabCloseProvider");
  }
  return context;
};

export default function TabCloseProvider({ children }) {
  const [showDialog, setShowDialog] = useState(false);
  const [pendingClose, setPendingClose] = useState(false);
  const { token: accessToken } = useAccessToken();

  useEffect(() => {
    // Use the accessToken from your hook instead of checking cookies manually
    const isAuthenticated = !!accessToken; // Convert to boolean



    if (isAuthenticated) {
      let cleanup;

      // Method 1: Using custom dialog (recommended)
      const handleBeforeUnload = (event) => {
        event.preventDefault();
        setShowDialog(true);
        setPendingClose(true);
        return (event.returnValue = "Are you sure you want to leave?");
      };

      // For custom dialog approach
      window.addEventListener("beforeunload", handleBeforeUnload);
      cleanup = () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };

      return cleanup;
    }
  }, [accessToken]); // Add accessToken as dependency

  const handleDialogClose = () => {
    setShowDialog(false);
    setPendingClose(false);
  };

  const handleLogoutConfirm = () => {
    setShowDialog(false);
    setPendingClose(false);
    // Window will close after logout
  };

  return (
    <TabCloseContext.Provider
      value={{
        showDialog,
        setShowDialog,
        accessToken, // Provide accessToken through context if needed
        isAuthenticated: !!accessToken,
      }}
    >
      {children}
      <LogoutConfirmationDialog
        isOpen={showDialog}
        onClose={handleDialogClose}
        onConfirm={handleLogoutConfirm}
        accessToken={accessToken} // Pass token to dialog if needed
      />
    </TabCloseContext.Provider>
  );
}
