"use client";

import { bighilSidebarValues } from "@/lib/dashboard constants/SidebarConstants";
import {
  LayoutDashboard,
  Building2,
  AlertCircle,
  MessageSquareText,
  Settings,
  Users2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";

const Bighil_Sidebar = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [hovered, setHovered] = useState(false);

  const toggleSidebar = useCallback(() => {
    setShowSideBar((prev) => !prev);
    setHovered(false);
  }, []);

  const linkToggle = useCallback(() => {
    if (!hovered) {
      setShowSideBar(false);
    }
  }, [hovered]);

  return (
    <aside
      className={`min-h-screen bg-black p-4 font-questrial relative transition-all duration-300 ${
        showSideBar || hovered ? "w-64" : "w-24"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        className="absolute top-6 -right-3 bg-[hsl(275,60%,50%)] text-white p-1 rounded-full hover:bg-[hsl(275,60%,60%)] transition-colors"
        onClick={toggleSidebar}
        aria-label={showSideBar ? "Collapse sidebar" : "Expand sidebar"}
      >
        {showSideBar ? (
          <ChevronLeft className="h-5 w-5" />
        ) : (
          <ChevronRight className="h-5 w-5" />
        )}
      </button>

      <div className="flex flex-col items-center">
        <Link href="/dashboard" className="w-full mb-8">
          <div className="flex items-center justify-center h-16 text-white">
            {showSideBar || hovered ? (
              <span className="text-2xl font-bold">BIGHIL</span>
            ) : (
              <span className="text-2xl font-bold">BH</span>
            )}
          </div>
        </Link>

        <nav className="w-full space-y-2">
          {bighilSidebarValues.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              className={`flex items-center p-3 rounded-lg transition-colors ${
                showSideBar || hovered
                  ? "justify-start gap-3"
                  : "justify-center"
              } hover:bg-blue-500 text-white hover:text-white`}
              onClick={linkToggle}
            >
              <item.icon className="h-5 w-5 min-w-[20px]" />
              {(showSideBar || hovered) && (
                <span className="text-sm font-medium">{item.title}</span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Bighil_Sidebar;
