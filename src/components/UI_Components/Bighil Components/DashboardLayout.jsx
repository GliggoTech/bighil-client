"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: Menu },
  { id: "companies", label: "Companies", icon: Menu },
  { id: "complaints", label: "Complaints", icon: Menu },
  { id: "messages", label: "Messages", icon: Menu },
];

export default function DashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen">
      {/* Mobile Navbar */}
      <nav className="lg:hidden fixed w-full bg-white dark:bg-gray-900 border-b h-16 flex items-center px-4 z-50">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold">Bighil Admin</h2>
            </div>
            <nav className="py-4">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start rounded-none px-6 h-12",
                    activeTab === item.id && "border-l-4 border-blue-500"
                  )}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileOpen(false);
                  }}
                >
                  <Link href={"/bighil/bighil-clients"}>
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </Link>
                </Button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <div className="ml-auto">
          <AvatarMenu />
        </div>
      </nav>

      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        <aside
          className={cn(
            "h-screen bg-white dark:bg-gray-900 border-r fixed transition-all duration-300",
            isCollapsed ? "w-20" : "w-64"
          )}
        >
          <div className="h-full flex flex-col">
            <div className="p-4 border-b">
              <h2
                className={cn(
                  "text-xl font-bold",
                  isCollapsed ? "hidden" : "block"
                )}
              >
                Bighil Admin
              </h2>
            </div>

            <nav className="flex-1 overflow-y-auto">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start rounded-none h-12",
                    activeTab === item.id && "border-l-4 border-blue-500",
                    isCollapsed ? "px-2" : "px-6"
                  )}
                  onClick={() => setActiveTab(item.id)}
                >
                  <item.icon
                    className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-3")}
                  />
                  {!isCollapsed && item.label}
                </Button>
              ))}
            </nav>

            <div className="border-t p-2">
              <Button
                variant="ghost"
                size="icon"
                className="w-full"
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                {isCollapsed ? (
                  <Menu className="h-6 w-6" />
                ) : (
                  <X className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </aside>

        <main
          className={cn(
            "flex-1 p-6 transition-all duration-300",
            isCollapsed ? "ml-20" : "ml-64"
          )}
        >
          <div className="w-full flex justify-end mb-8">
            <AvatarMenu />
          </div>
          {children}
        </main>
      </div>

      {/* Mobile Content */}
      <div className="lg:hidden pt-16 p-4">{children}</div>
    </div>
  );
}

function AvatarMenu() {
  return (
    <div className="relative">
      <img
        src="https://placehold.co/40"
        className="rounded-full border-2 border-blue-100 w-10 h-10"
        alt="Avatar"
      />
      <div className="absolute right-0 top-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
    </div>
  );
}
