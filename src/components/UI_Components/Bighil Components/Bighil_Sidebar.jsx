"use client";

import { bighilSidebarValues } from "@/lib/dashboard constants/SidebarConstants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIsTouchDevice } from "@/custom hooks/useIsTouchDevice";

const sidebarVariants = {
  open: { width: 240 },
  closed: { width: 72 },
};
const Bighil_Sidebar = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname();
  const isTouchDevice = useIsTouchDevice(); // Use the touch detection hook

  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

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
        className="absolute top-5 -right-4 bg-active-link hover:bg-green text-white p-1 rounded-full transition-colors"
        onClick={toggleSidebar}
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>

      {/* Logo or Short Form */}
      <div className="flex items-center justify-center mb-10">
        <span className="text-active-link font-bold text-xl tracking-wide">
          {isOpen ? "BIGHIL" : "BH"}
        </span>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex flex-col gap-2">
        {bighilSidebarValues.map((item) => {
          const isActive = pathname === item.path;

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
                    : "hover:bg-active-link/80 group-hover:text-white"
                } ${isOpen ? "justify-start gap-4" : "justify-center"}`}
              >
                <item.icon
                  className={`w-5 h-5 ${
                    isActive
                      ? "text-white"
                      : "text-primary group-hover:text-white"
                  }`}
                />

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

              {!isOpen && !isTouchDevice && (
                <span className="absolute left-12 top-1/2 -translate-y-1/2 whitespace-nowrap bg-primary text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50">
                  {item.title}
                </span>
              )}
            </div>
          );
        })}
      </nav>
    </motion.aside>
  );
};

export default Bighil_Sidebar;
