"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { Loader2, LogOut } from "lucide-react";
import { bighilLogout } from "@/app/actions/bighil.actions";
import Link from "next/link";
import Image from "next/image";

const Bighil_Navbar = ({ isOpen }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogOut = async () => {
    try {
      setLoading(true);
      const res = await bighilLogout();
      if (res.success) {
        setError(null);
        setLoading(false);
        router.push("/");
      }
    } catch (error) {
      setError(res.message);
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`w-full overflow-hidden bg-white shadow-md  px-11 sm:px-10 transition-all duration-200
    ${isOpen ? "ml-[240px]" : "ml-[30px] md:ml-[45px]"}
    min-h-16 sm:min-h-16 md:min-h-16 lg:min-h-14 xl:min-h-16
  `}
    >
      <div className=" px-4 sm:px-6">
        <div className="h-16 md:h-20 flex items-center justify-between">
          <div className="flex-shrink-0 flex items-center h-full">
            <Link
              href="/bighil/bighil-dashboard"
              className="flex items-center h-full py-2"
            >
              <div className="relative h-28 ">
                <Image
                  src="/b6.svg"
                  width={240}
                  height={50}
                  alt="logo"
                  quality={100}
                  className="h-full w-auto object-cover"
                  priority
                />
              </div>
            </Link>
          </div>
          {/* Left side: Welcome Text */}
          {/* <h1 className="text-lg  text-text_color ">Hi, Welcome to Dashboard</h1> */}

          {/* Right side: Error and Logout */}
          <div className="flex items-center gap-4">
            {error && (
              <p className="text-red text-sm bg-red/10 px-3 py-1 rounded-md">
                {error}
              </p>
            )}

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              disabled={loading}
              onClick={handleLogOut}
              className="flex items-center justify-end gap-2 bg-primary hover:bg-primary/80 text-white px-2 py-2 rounded-md  transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <LogOut className="w-4 h-4" />
              )}
              Logout
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Bighil_Navbar;
