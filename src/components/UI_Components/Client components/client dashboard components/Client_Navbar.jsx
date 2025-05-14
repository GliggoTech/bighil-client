"use client";
import { useState } from "react";
import { clientLogout } from "@/app/actions/client.actions";
import useNotificationStore from "@/store/notificationStore";
import { LogOut, AlertCircle, Menu, X, ChevronRight } from "lucide-react";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Client_Navbar = ({ isOpen }) => {
  const { userRole } = useNotificationStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogOut = async () => {
    try {
      setLoading(true);
      const res = await clientLogout();
      if (res.success) {
        setError(null);
        setLoading(false);
        router.push("/");
      } else {
        setError(res.message || "Logout failed. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  const dismissError = () => {
    setError(null);
  };

  return (
    <div>
      {/* Main Navbar */}
      <div
        className={`w-full overflow-hidden bg-white shadow-md  px-6 sm:px-10 transition-all duration-200
    ${isOpen ? "ml-[240px]" : "ml-[30px] md:ml-[45px]"}
    min-h-16 sm:min-h-16 md:min-h-16 lg:min-h-14 xl:min-h-16
  `}
      >
        <div>
          <div className=" px-4 sm:px-6">
            <div className="h-16 md:h-20 flex items-center justify-between">
              {/* Left Section: Logo & Mobile Menu */}
              <div className="flex items-center">
                <div className="flex items-center">
                  <h1 className="text-xl ml-10 sm:text-3xl font-bold tracking-tight text-primary">
                    BIGHIL
                  </h1>
                </div>
              </div>

              {/* Right Section: User Info & Actions */}
              <div className="flex items-center space-x-4">
                {/* User Role Badge - Different styles for different roles */}
                {userRole && (
                  <div className="hidden sm:flex items-center">
                    <Card
                      className={`
                      px-3 py-1.5 border-0 shadow-md
                      ${
                        userRole === "ADMIN"
                          ? "bg-purple/10 dark:bg-purple-900/20 text-purple dark:text-purple-300"
                          : userRole === "SUPER ADMIN"
                          ? "bg-blue/10 dark:bg-blue-900/20 text-blue dark:text-blue-300"
                          : "bg-green/10 dark:bg-green-900/20 text-green dark:text-green-300"
                      }
                    `}
                    >
                      <span className="text-sm font-medium flex items-center">
                        <span
                          className={`
                          inline-block w-2 h-2 rounded-full mr-2
                          ${
                            userRole === "ADMIN"
                              ? "bg-purple"
                              : userRole === "SUPER ADMIN"
                              ? "bg-blue"
                              : "bg-green"
                          }
                        `}
                        ></span>
                        {userRole}
                      </span>
                    </Card>
                  </div>
                )}

                {/* Logout Button */}
                <Button
                  onClick={handleLogOut}
                  disabled={loading}
                  variant="default"
                  className="bg-primary hover:bg-primary/90 text-white rounded-full px-4 py-2 h-9 sm:h-10 flex items-center space-x-2 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <span className="hidden sm:inline">
                    {loading ? "Logging Out..." : "Logout"}
                  </span>
                  <span className="sm:hidden">
                    {loading ? "..." : "Logout"}
                  </span>
                  <LogOut
                    className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="absolute top-full left-0 right-0 px-4 pt-3 z-50">
          <Alert
            variant="destructive"
            className="max-w-md mx-auto animate-slide-down"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="flex items-center justify-between">
              <span>{error}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={dismissError}
              >
                <X className="h-4 w-4" />
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default Client_Navbar;
