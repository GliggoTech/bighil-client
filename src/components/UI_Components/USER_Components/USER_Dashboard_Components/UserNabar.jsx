"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FiMenu,
  FiX,
  FiPlusCircle,
  FiList,
  FiLogOut,
  FiUser,
} from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import useFetch from "@/custom hooks/useFetch";

import { getBackendUrl } from "@/lib/getBackendUrl";
import { useRouter } from "next/navigation";
import useAccessToken from "@/custom hooks/useAccessToken";
import useNotificationStore from "@/store/notificationStore";
import { IconBase } from "react-icons";
import { CiSettings } from "react-icons/ci";
import { userSignout } from "@/app/actions/user.action";

const UserNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("user-add-complaint");
  const { userId, userRole, notificationCount } = useNotificationStore();

  const { loading, fetchData } = useFetch();
  const router = useRouter();
  const token = useAccessToken();

  const navLinks = [
    {
      name: "Add Complaint",
      icon: <FiPlusCircle className="mr-2 h-5 w-5" />,
      url: "/user/user-add-complaint",
    },
    {
      name: "My Complaints",
      icon: <FiList className="mr-2 h-5 w-5" />,
      url: "/user/my-complaints",
    },
  ];

  const handleLogOut = async () => {
    const res = await userSignout();
    if (res.success) {
      router.push("/");
    } else {
      console.error(res.message);
    }
  };

  return (
    <nav className="bg-black/50 backdrop-blur supports-[backdrop-filter]:bg-black/50 border-b border-neutral-100/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              BIGHIL
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Button
                asChild
                key={link.name}
                variant="ghost"
                className={cn(
                  "hover:bg-hoverState text-white transition-colors",
                  activeLink === link.name
                    ? "text-primary border-b-2 border-primary"
                    : "hover:text-primary"
                )}
                onClick={() => setActiveLink(link.name)}
              >
                <Link href={link.url}>
                  {link.icon}
                  {link.name}
                </Link>
              </Button>
            ))}

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full h-10 w-10 p-0 ">
                  <Avatar className="h-8 w-8  border-primary bg-secondary">
                    <AvatarImage src="/user-avatar.png" />
                    <AvatarFallback>
                      <FiUser className="h-4 w-4 text-white" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="border-neutral-100/30"
              >
                <DropdownMenuItem
                  className="text-red-600 hover:bg-red-50/50 cursor-pointer"
                  onClick={handleLogOut}
                >
                  <FiLogOut className="mr-2 h-4 w-4 text-blue-600" />
                  Logout
                </DropdownMenuItem>
                <DropdownMenuItem className=" hover:bg-red-50/50 cursor-pointer flex">
                  <Link
                    href={`/user/user-setting`}
                    className="flex items-center"
                  >
                    <CiSettings className="mr-2 h-4 w-4 text-blue-600" />
                    Setting
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/user/user-notifications">
              <div className="relative p-2 bg-black rounded-full">
                🔔
                {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-xs px-2 rounded-full">
                    {notificationCount}
                  </span>
                )}
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-neutral-700 hover:bg-hoverState"
            >
              {isMobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            isMobileMenuOpen ? "max-h-96" : "max-h-0"
          )}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center p-3 rounded-lg transition-colors",
                  activeLink === link.name
                    ? "bg-primary text-onPrimary"
                    : "text-neutral-700 hover:bg-hoverState"
                )}
                onClick={() => {
                  setActiveLink(link.name);
                  setIsMobileMenuOpen(false);
                }}
              >
                {link.icon}
                {link.name}
              </a>
            ))}

            {/* Mobile Logout */}
            <div className="border-t border-neutral-100/30 pt-2 mt-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:bg-red-50/50"
                onClick={handleLogOut}
              >
                <FiLogOut className="mr-2 h-5 w-5" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
