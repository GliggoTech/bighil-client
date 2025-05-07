"use client";

import { bighilSidebarValues } from "@/lib/dashboard constants/SidebarConstants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const sidebarVariants = {
  open: {
    width: 240,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25,
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  closed: {
    width: 72,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 100 },
  },
  closed: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.2 },
  },
};

const Bighil_Sidebar = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname();

  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <motion.aside
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
      className="fixed top-0 left-0 z-40 h-screen bg-[#f3f3f3]/90 border-r border-[#757b97] shadow-lg flex flex-col p-4 transition-all"
    >
      {/* Toggle Button */}
      <button
        className="absolute top-5 -right-4 bg-active-link hover:bg-green-800 text-white p-1 rounded-full transition-colors"
        onClick={toggleSidebar}
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* Logo */}
      <div className="flex items-center justify-center mb-10">
        <span className="text-active-link font-extrabold text-2xl tracking-widest">
          {isOpen ? "BIGHIL" : "BH"}
        </span>
      </div>

      {/* Navigation */}
      <motion.nav
        className="flex flex-col gap-3"
        initial="closed"
        animate="open"
        exit="closed"
        variants={{
          open: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
          closed: {},
        }}
      >
        {bighilSidebarValues.map((item) => {
          const isActive = pathname === item.path;

          return (
            <motion.div
              key={item.id}
              className="relative group"
              variants={itemVariants}
              onClick={() => setIsOpen(false)}
            >
              <Link
                href={item.path}
                className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                  isActive
                    ? "bg-active-link text-white"
                    : "text-green-900 hover:bg-active-link/90 hover:text-white"
                } ${isOpen ? "justify-start gap-4" : "justify-center"}`}
              >
                <item.icon
                  className={`transition-transform duration-300 group-hover:scale-110 ${
                    isActive ? "text-white" : "text-green-800"
                  }`}
                  size={isOpen ? 24 : 28}
                />
                <AnimatePresence>
                  {isOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="font-medium"
                    >
                      {item.title}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              {/* Tooltip on hover when collapsed */}
              {!isOpen && (
                <span className="absolute left-10 top-1/2 -translate-y-1/2 whitespace-nowrap bg-black/80 text-white text-xs px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-50">
                  {item.title}
                </span>
              )}
            </motion.div>
          );
        })}
      </motion.nav>
    </motion.aside>
  );
};

export default Bighil_Sidebar;
