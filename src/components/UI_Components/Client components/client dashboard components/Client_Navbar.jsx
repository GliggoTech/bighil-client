"use client";
import useAccessToken from "@/custom hooks/useAccessToken";
import useFetch from "@/custom hooks/useFetch";
import { getBackendUrl } from "@/lib/getBackendUrl";
import useNotificationStore from "@/store/notificationStore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Bell, LogOut, ChevronRight } from "lucide-react";

const Client_Navbar = () => {
  const router = useRouter();
  const { loading, fetchData } = useFetch();
  const token = useAccessToken();
  const { userRole, notificationCount } = useNotificationStore();

  const handleLogOut = async () => {
    const url = getBackendUrl();
    const res = await fetchData(
      `${url}/api/client-auth/client-logout`,
      "POST",
      {},
      token,
      false
    );
    if (res.success) {
      router.push("/");
    }
  };

  return (
    <motion.div
      className="w-full bg-gradient-to-r from-primary/10 via-primary-light/20 to-primary-dark/30
                 border-b border-border-dark/10"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="max-w-7xl mx-auto h-20 px-6 sm:px-10">
        <div className="h-full flex items-center justify-between">
          {/* Logo Section */}
          <motion.div
            className="flex items-center space-x-2 "
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <div
              // className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent-info
              //             rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-1000
              //             group-hover:duration-200"
              />
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

            {/* Notification Button */}
            {/* <motion.button
              className="relative p-2 rounded-full
                         bg-surface-dark 
                         border border-border-dark/20
                         hover:border-primary/50
                         transition-all duration-300
                         group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell
                className="h-5 w-5 text-text-light 
                              group-hover:text-primary-light
                              transition-colors duration-300"
              />

              {notificationCount > 0 && (
                <motion.div
                  className="absolute -top-1 -right-1
                             h-5 w-5 flex items-center justify-center
                             rounded-full bg-gradient-to-r from-accent-danger to-accent-heavyDanger
                             text-xs font-bold text-text-light
                             border-2 border-surface-dark
                             shadow-lg"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {notificationCount > 99 ? "99+" : notificationCount}
                </motion.div>
              )}
            </motion.button> */}

            {/* Logout Button */}
            <motion.button
              onClick={handleLogOut}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg
                         bg-gradient-to-r from-primary to-secondary
                         hover:from-primary-dark hover:to-secondary-dark
                         text-text-light font-medium
                         shadow-lg hover:shadow-xl
                         transition-all duration-300
                         disabled:opacity-50 disabled:cursor-not-allowed
                         group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Logout</span>
              <LogOut
                className="h-4 w-4 transform group-hover:-rotate-12 
                                transition-transform duration-300"
              />
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Optional: Animated Accent Line */}
      {/* <motion.div
        className="h-0.5 bg-gradient-to-r from-primary via-secondary to-accent-info"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      /> */}
    </motion.div>
  );
};

export default Client_Navbar;
