"use client";
import { useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import useNotificationStore from "@/store/notificationStore";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { clientSidebarValues } from "@/lib/dashboard constants/SidebarConstants";
import { usePathname } from "next/navigation";
import useFetch from "@/custom hooks/useFetch";
import useAccessToken from "@/custom hooks/useAccessToken";
import { getBackendUrl } from "@/lib/getBackendUrl";
import { useIsTouchDevice } from "@/custom hooks/useIsTouchDevice";

const sidebarVariants = {
  open: { width: 240 },
  closed: { width: 72 },
};

const Client_Sidebar = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname();
  const { notificationCount, setTotalUnreadCount } = useNotificationStore();
  const { fetchData } = useFetch();
  const token = useAccessToken();
  const isTouchDevice = useIsTouchDevice(); // Initialized hook

  useEffect(() => {
    const fetchNotificationCount = async () => {
      const url = getBackendUrl();
      const res = await fetchData(
        `${url}/api/client-notifications/unread-count`,
        "GET",
        {},
        token,
        false
      );
      res?.success && setTotalUnreadCount(res.data.count);
    };
    token && fetchNotificationCount();
  }, [token, fetchData]);

  const toggleSidebar = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <motion.aside
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
      transition={{ duration: 0.1 }}
      className="fixed top-0 left-0 z-40 h-screen bg-[#f3f3f3]/90 border-r border-client_login_bg shadow-sm flex flex-col p-4 transition-all"
    >
      <button
        className="absolute top-5 -right-4 bg-active-link hover:bg-green-800 text-white p-1 rounded-full transition-colors"
        onClick={toggleSidebar}
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>

      <div className="flex items-center justify-center mb-10">
        <span className="text-active-link font-bold text-xl tracking-wide">
          {isOpen ? "BIGHIL" : "BH"}
        </span>
      </div>

      <nav className="flex flex-col gap-2">
        {clientSidebarValues.map((item) => {
          const isActive = pathname === item.path;
          const showNotificationBadge =
            item.title === "Notifications" && notificationCount > 0;

          return (
            <div
              key={item.id}
              className="relative group"
              onClick={() => setIsOpen(false)}
            >
              <Link
                href={item.path}
                className={`flex items-center px-3 py-2 rounded-lg text-sm transition-colors relative ${
                  isActive
                    ? "bg-active-link text-white"
                    : "text-green-900 hover:bg-active-link/90 hover:text-white"
                } ${isOpen ? "justify-start gap-3" : "justify-center"}`}
              >
                <item.icon
                  className={`w-5 h-5 text-3xl ${
                    isActive ? "text-white" : "text-indigo"
                  }`}
                />

                {showNotificationBadge && (
                  <span
                    className={`absolute top-1 left-6  ${
                      isOpen ? "ml-36" : ""
                    } bg-red text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full z-10`}
                  >
                    {notificationCount > 99 ? "99+" : notificationCount}
                  </span>
                )}

                <AnimatePresence>
                  {isOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2"
                    >
                      {item.title}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              {/* Touch device check added here */}
              {!isOpen && !isTouchDevice && (
                <span className="absolute left-10 top-1/2 -translate-y-1/2 whitespace-nowrap bg-primary text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50">
                  {item.title}
                  {showNotificationBadge && (
                    <span className="ml-1 bg-red text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                      {notificationCount > 99 ? "99+" : notificationCount}
                    </span>
                  )}
                </span>
              )}
            </div>
          );
        })}
      </nav>
    </motion.aside>
  );
};

export default Client_Sidebar;
