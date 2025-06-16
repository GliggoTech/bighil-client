"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import useNotificationStore from "@/store/notificationStore";
import { clientSidebarValues } from "@/lib/dashboard constants/SidebarConstants";
import useFetch from "@/custom hooks/useFetch";
import useAccessToken from "@/custom hooks/useAccessToken";
import { getBackendUrl } from "@/lib/getBackendUrl";
import { useIsTouchDevice } from "@/custom hooks/useIsTouchDevice";

const sidebarVariants = {
  open: { width: 240 },
  closed: { width: 72 },
};

const Client_Sidebar = ({ isOpen, setIsOpen }) => {
  const [visibleToIT, setVisibleToIT] = useState(null);
  const [filteredSidebarItems, setFilteredSidebarItems] =
    useState(clientSidebarValues);
  const pathname = usePathname();
  const { notificationCount, setTotalUnreadCount, userRole } =
    useNotificationStore();
  const { fetchData } = useFetch();
  const { token } = useAccessToken();
  const isTouchDevice = useIsTouchDevice();

  const hasFetchedRef = useRef(false);
  const hasUserDataFetchedRef = useRef(false);
  useEffect(() => {
    const fetchNotificationCount = async () => {
      if (!token || hasFetchedRef.current) return;

      try {
        const url = getBackendUrl();
        const res = await fetchData(
          `${url}/api/client-notifications/unread-count`,
          "GET",
          {},
          token,
          false
        );

        if (res?.success) {
          hasFetchedRef.current = true;
          if (notificationCount !== res.data.count) {
            setTotalUnreadCount(res.data.count);
          }
        }
      } catch (error) {
        console.error("Error fetching notification count:", error);
      }
    };

    fetchNotificationCount();
  }, [token, fetchData, setTotalUnreadCount, notificationCount]);
  // Fetch user data to get role and visibleToIT
  useEffect(() => {
    const fetchUserData = async () => {
      if (!token || hasUserDataFetchedRef.current) return;

      try {
        const url = getBackendUrl();
        const res = await fetchData(
          `${url}/api/client/visible-to-it`, // Adjust this endpoint based on your API
          "GET",
          {},
          token,
          false
        );

        if (res?.success) {
          hasUserDataFetchedRef.current = true;

          setVisibleToIT(res.data.visibleToIT); // Adjust based on your data structure
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [token, fetchData]);
  // Filter sidebar items based on user role and visibleToIT
  useEffect(() => {
    if (userRole === null || visibleToIT === null) return;

    let filteredItems = [...clientSidebarValues];

    // If user is ADMIN and visibleToIT is false, remove complaints route
    if (userRole === "ADMIN" && !visibleToIT) {
      filteredItems = filteredItems.filter(
        (item) => item.title !== "Complaints"
      );
    }

    setFilteredSidebarItems(filteredItems);
  }, [userRole, visibleToIT]);
  const toggleSidebar = useCallback(
    () => setIsOpen((prev) => !prev),
    [setIsOpen]
  );

  return (
    <motion.aside
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
      transition={{ duration: 0.1 }}
      className="fixed top-0 left-0 z-40 h-screen bg-white border-r border-dialog_inside_border_color shadow-sm flex flex-col p-3 transition-all"
    >
      {/* Sidebar Toggle Button */}
      <button
        className="absolute top-7 -right-3 bg-active-link hover:bg-green text-white p-1 rounded-full transition-colors"
        onClick={toggleSidebar}
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>

      {/* Logo or Short Form */}
      <div className="flex items-center justify-center mb-5 mt-4">
        <span className="text-active-link font-bold text-xl tracking-wide">
          {isOpen ? "BIGHIL" : "BH"}
        </span>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex flex-col gap-2">
        {filteredSidebarItems.map((item) => {
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
                className={`flex items-center px-1 py-2 rounded-lg text-sm transition-colors relative ${
                  isActive
                    ? "bg-active-link text-white"
                    : "hover:bg-active-link/60 group-hover:text-white"
                } ${isOpen ? "justify-start gap-4" : "justify-center"}`}
              >
                <item.icon
                  className={`w-5 h-5 ${
                    isActive
                      ? "text-white"
                      : "text-primary group-hover:text-white"
                  }`}
                />

                {showNotificationBadge && (
                  <>
                    {/* Dot only when isOpen is false */}
                    {!isOpen && (
                      <span className="absolute top-1 left-8 bg-red text-white w-2 h-2 rounded-full z-10" />
                    )}

                    {/* Dot with count when isOpen is true */}
                    {isOpen && (
                      <span className="absolute top-2 left-40 bg-red text-white text-[10px] font-semibold px-1 py-0.5 rounded-md z-10 min-w-[18px] text-center">
                        {notificationCount > 99 ? "99+" : notificationCount}
                      </span>
                    )}
                  </>
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

              {/* Tooltip - Only show when sidebar is closed and not on touch devices */}
              {!isOpen && !isTouchDevice && (
                <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap bg-primary text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[99999]">
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
