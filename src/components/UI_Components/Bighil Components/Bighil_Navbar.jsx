"use client";

import useAccessToken from "@/custom hooks/useAccessToken";
import useFetch from "@/custom hooks/useFetch";
import { getBackendUrl } from "@/lib/getBackendUrl";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { Loader2, LogOut } from "lucide-react";

const Bighil_Navbar = ({ isOpen }) => {
  const router = useRouter();

  const token = useAccessToken();
  const { loading, fetchData } = useFetch();
  const [error, setError] = useState(null);

  const handleLogOut = useCallback(async () => {
    setError(null);
    try {
      const url = getBackendUrl();
      const res = await fetchData(
        `${url}/api/bighil-auth/bighil-logout`,
        "POST",
        {},
        token,
        false
      );
      if (res.success) {
        router.push("/");
      } else {
        throw new Error(res.message || "Logout failed");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    }
  }, [fetchData, token, router]);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={` h-20 bg-white/50 shadow-md flex items-center justify-between px-6 sm:px-10 transition-all duration-200 ${
        isOpen ? "ml-[240px]" : "ml-[72px]"
      }`}
    >
      {/* Left side: Welcome Text */}
      <h1 className="text-lg  text-text_color ">Hi, Welcome to Dashboard</h1>

      {/* Right side: Error and Logout */}
      <div className="flex items-center gap-4">
        {error && (
          <p className="text-red-500 text-sm bg-red-100 px-3 py-1 rounded-md">
            {error}
          </p>
        )}

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          disabled={loading}
          onClick={handleLogOut}
          className="flex items-center gap-2 bg-purple hover:bg-purple/80 text-white px-2 py-2 rounded-md  transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <LogOut className="w-4 h-4" />
          )}
          Logout
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Bighil_Navbar;
