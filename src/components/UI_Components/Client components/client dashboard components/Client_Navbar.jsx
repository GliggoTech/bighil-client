"use client";

import { useState } from "react";
import useAccessToken from "@/custom hooks/useAccessToken";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, AlertCircle, X } from "lucide-react";
import { clientLogout } from "@/app/actions/client.actions";
import useNotificationStore from "@/store/notificationStore";

const Client_Navbar = () => {
  const router = useRouter();

  const { userRole } = useNotificationStore();

  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogOut = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await clientLogout();

      if (res.success) {
        router.push("/");
      } else {
        setError(res.message || "Logout failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Logout error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const dismissError = () => {
    setError(null);
  };

  return (
    <motion.div
      className="w-full bg-gradient-to-r from-primary/10 via-primary-light/20 to-primary-dark/30
                 border-b border-border-dark/10 relative"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Error notification */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="absolute top-full left-0 right-0 z-50 mx-auto mt-2 max-w-md"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg shadow-lg mx-4 flex items-center p-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mr-2" />
              <p className="flex-1 text-sm">{error}</p>
              <button
                onClick={dismissError}
                className="p-1.5 rounded-full hover:bg-red-100 text-red-500 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="max-w-7xl mx-auto h-20 px-6 sm:px-10">
        <div className="h-full flex items-center justify-between">
          {/* Logo Section */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <h1
                className="relative bg-background-dark rounded-lg px-4 py-2
                           md:text-3xl font-bold font-Questrial 
                           bg-clip-text text-transparent 
                           bg-gradient-to-r from-primary via-secondary to-accent-info"
              >
                BIGHIL
              </h1>
            </div>
          </motion.div>

          {/* Actions Section */}
          <div className="flex items-center space-x-6">
            {/* Role Badge */}
            {userRole && (
              <motion.div
                className="px-4 py-1.5 rounded-full 
                         bg-gradient-to-r from-primary to-primary/80
                         border border-border-dark/20
                         backdrop-blur-sm md:block hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-text-light font-medium text-sm">
                  {userRole}
                </span>
              </motion.div>
            )}

            {/* Logout Button */}
            <motion.button
              onClick={handleLogOut}
              disabled={isLoading}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg
                         bg-gradient-to-r from-primary to-secondary
                         hover:from-primary-dark hover:to-secondary-dark
                         text-text-light font-medium
                         shadow-lg hover:shadow-xl
                         transition-all duration-300
                         disabled:opacity-70 disabled:cursor-not-allowed
                         group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{isLoading ? "Logging Out..." : "Logout"}</span>
              <LogOut
                className={`h-4 w-4 transition-all duration-300 ${
                  isLoading
                    ? "animate-pulse"
                    : "transform group-hover:-rotate-12"
                }`}
              />
            </motion.button>
          </div>
        </div>
      </nav>
    </motion.div>
  );
};

export default Client_Navbar;
