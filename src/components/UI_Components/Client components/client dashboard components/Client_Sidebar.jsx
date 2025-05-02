"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import useNotificationStore from "@/store/notificationStore";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { clientSidebarValues } from "@/lib/dashboard constants/SidebarConstants";

const Client_Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [activeItem, setActiveItem] = useState(1);
  const [hoveredItem, setHoveredItem] = useState(null);
  const unreadCount = useNotificationStore((state) => state.notificationCount);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const path = window.location.pathname;
    const currentItem = clientSidebarValues.find((item) => path === item.path);
    if (currentItem) {
      setActiveItem(currentItem.id);
    }
  }, []);

  const toggleSidebar = useCallback(() => {
    setExpanded((prev) => !prev);
    setHovered(false);
  }, []);

  const isExpanded = expanded || hovered;

  return (
    <motion.aside
      className="min-h-screen relative bg-gradient-to-b from-background-secondary to-background-dark/20 overflow-hidden flex flex-col z-10 border-r border-border-light dark:border-border-dark"
      initial={false}
      animate={{ width: isExpanded ? 280 : 88 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* <div className="absolute inset-0 bg-gradient-to-b from-background-primary/50 dark:from-surface-dark to-background-secondary/30 dark:to-background-dark" /> */}

      <div className="relative z-50 flex flex-col h-full py-6 px-4">
        {/* <motion.button
          className="absolute top-6 -right-2 w-6 h-6 flex items-center justify-center rounded-full bg-primary-dark text-text-light shadow-lg hover:bg-primary-default transition-colors duration-200 z-20 border border-border-light dark:border-border-dark"
          whileTap={{ scale: 0.9 }}
          onClick={toggleSidebar}
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={expanded ? "collapse" : "expand"}
              initial={{ opacity: 0, rotate: expanded ? -90 : 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: expanded ? 90 : -90 }}
              transition={{ duration: 0.2 }}
            >
              {expanded ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.button> */}

        <div className="mb-10 px-2">
          <div className="flex items-center justify-center h-12">
            <div className="relative">
              <div className="font-bold flex items-center">
                <span className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  B
                </span>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{
                        opacity: 1,
                        width: "auto",
                        transition: { delay: 0.1, duration: 0.2 },
                      }}
                      exit={{ opacity: 0, width: 0 }}
                      className="overflow-hidden flex"
                    >
                      <span className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-secondary-light to-accent-info">
                        IGHIL
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-primary-default/80 via-secondary-default/80 to-accent-info/10" />
            </div>
          </div>
        </div>

        <nav className="flex-1  px-2">
          {clientSidebarValues.map((item) => {
            const isActive = activeItem === item.id;
            const isItemHovered = hoveredItem === item.id;

            return (
              <Link
                key={item.id}
                href={item.path}
                onClick={() => setActiveItem(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <motion.div
                  className={`relative flex items-center rounded-xl transition-all duration-200 ${
                    isActive
                      ? "text-text-light"
                      : "text-background-dark hover:text-primary"
                  }`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeBackground"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-dark/80 to-secondary-dark/80 border border-primary-default/20"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}

                  {!isActive && isItemHovered && (
                    <motion.div
                      layoutId="hoverBackground"
                      className="absolute inset-0 rounded-xl bg-primary/20 border border-border-light/20 dark:border-border-dark/20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}

                  <div
                    className={`relative z-10 flex items-center py-3 px-4 ${
                      isExpanded ? "justify-start" : "justify-center w-full"
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      {isActive && (
                        <div className="absolute inset-0 bg-primary-default/50 blur-md rounded-full" />
                      )}
                      <item.icon
                        className={`h-5 w-5 ${
                          isActive
                            ? "text-text-light"
                            : "text-primary font-bold "
                        }`}
                        strokeWidth={isActive ? 2.5 : 2}
                      />
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          className="ml-4 flex-1 whitespace-nowrap"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{
                            opacity: 1,
                            x: 0,
                            transition: { delay: 0.1 },
                          }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className="font-medium ">{item.title}</span>
                          {/* {isActive && (
                            <motion.p
                              className="text-xs text-white mt-0.5 max-w-[180px] truncate"
                              initial={{ opacity: 0 }}
                              animate={{
                                opacity: 1,
                                transition: { delay: 0.2 },
                              }}
                            >
                              {item.description}
                            </motion.p>
                          )} */}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {item.title === "Notifications" && unreadCount > 0 && (
                      <div
                        className={`absolute ${
                          isExpanded ? "right-1" : "top-1 right-1"
                        }`}
                      >
                        <motion.div
                          className={`flex h-5 w-5 items-center justify-center rounded-full bg-accent-danger text-[10px] font-bold text-text-light shadow-lg ${
                            mounted ? "animate-pulse" : ""
                          }`}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring" }}
                        >
                          {unreadCount > 99 ? "99+" : unreadCount}
                        </motion.div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* <div className="mt-auto pt-6 px-2">
          <div className="rounded-xl bg-surface-medium dark:bg-surface-dark p-4 border border-border-light/20 dark:border-border-dark/20">
            <AnimatePresence>
              {isExpanded ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-text-muted text-center"
                >
                  <span className="block text-primary-default font-medium mb-1">
                    BIGHIL Platform
                  </span>
                  Report with confidence
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center"
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary-default to-secondary-default flex items-center justify-center text-text-light font-bold text-xs">
                    BH
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div> */}
      </div>
    </motion.aside>
  );
};

export default Client_Sidebar;
