"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiBell } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import useNotificationStore from "@/store/notificationStore";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/dashboard constants/SidebarConstants";
import { usePathname, useRouter } from "next/navigation";
import { userSignout } from "@/app/actions/user.action";
import { LogOut, User } from "lucide-react";

import AdvancedStyledDropdown from "../../Standard_Components/AdvancedStyledDropdown";
import Image from "next/image";
import useAccessToken from "@/custom hooks/useAccessToken";
import useFetch from "@/custom hooks/useFetch";
import { getBackendUrl } from "@/lib/getBackendUrl";

const UserNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // get current URL path
  const [activeLink, setActiveLink] = useState(
    pathname || "/user/user-add-complaint"
  );
  const { notificationCount, setTotalUnreadCount } = useNotificationStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const hasFetchedRef = useRef(false);
  const { token } = useAccessToken();
  const { fetchData } = useFetch();

  useEffect(() => {
    const fetchNotificationCount = async () => {
      if (!token || hasFetchedRef.current) return;

      try {
        const url = getBackendUrl();
        const res = await fetchData(
          `${url}/api/user-notifications/unread-count`,
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

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);
  const handleLogOut = async () => {
    try {
      setLoading(true);
      const res = await userSignout();
      if (res.success) {
        useNotificationStore.setState({
          userId: null,
          userRole: null,
          notificationCount: 0,
          notifications: [],
          lastSync: null,
        });
        setLoading(false);
        router.push("/");
      } else {
        setLoading(false);
        setError(res.message);
      }
    } catch (error) {
      setLoading(false);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const menuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
    closed: { opacity: 0, y: -20 },
  };

  const itemVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -20 },
  };

  return (
    <nav className="bg-white border-b border-light-border-subtle sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Enhanced Logo Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0 flex items-center h-full"
          >
            <Link
              href="/user/user-add-complaint"
              className="flex items-center h-full py-2"
              onClick={() => setActiveLink("/user/user-add-complaint")}
            >
              <div className="relative h-12 ">
                <Image
                  src="/logo.png"
                  width={160}
                  height={40}
                  alt="logo"
                  quality={100}
                  className="h-full w-auto object-cover"
                  priority
                />
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation - Adjusted spacing */}
          <div className="hidden lg:flex items-center gap-4 flex-1 justify-center px-8">
            <motion.ul
              initial="closed"
              animate="open"
              variants={menuVariants}
              className="flex items-center gap-2"
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.name}
                  variants={itemVariants}
                  className="relative"
                >
                  <Link
                    href={link.url}
                    onClick={() => setActiveLink(link.url)}
                    className={cn(
                      "flex items-center text-base px-3 py-2 rounded-lg transition-colors whitespace-nowrap",
                      activeLink === link.url
                        ? "bg-primary/10 text-primary font-light"
                        : "text-text_color hover:bg-primary/5 hover:text-primary"
                    )}
                  >
                    {link.icon}
                    <span className="ml-2 text-sm">{link.name}</span>
                    {link.name === "Notifications" && notificationCount > 0 && (
                      <span className="ml-2 bg-danger text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {notificationCount > 99 ? "99+" : notificationCount}
                      </span>
                    )}
                  </Link>
                  {activeLink === link.url && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-x-0 -bottom-px h-0.5 bg-primary"
                    />
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Desktop User Actions */}
          <div className="hidden lg:flex lg:items-center lg:gap-3 flex-shrink-0">
            <AdvancedStyledDropdown
              handleLogOut={handleLogOut}
              loading={loading}
              error={error}
              setActiveLink={setActiveLink}
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex-shrink-0">
            <Button
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:bg-primary/5 hover:text-primary"
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
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden border-t border-light-border-subtle/50"
            >
              <motion.div
                variants={menuVariants}
                initial="closed"
                animate="open"
                className="px-2 pt-4 pb-4 space-y-1 bg-light-bg-subtle/95"
              >
                {navLinks.map((link) => (
                  <motion.div
                    key={link.name}
                    variants={itemVariants}
                    className="relative"
                  >
                    <Link
                      href={link.url}
                      onClick={() => {
                        setActiveLink(link.url);
                        setIsMobileMenuOpen(false);
                      }}
                      className={cn(
                        "flex items-center px-4 py-3 rounded-lg transition-colors",
                        activeLink === link.url
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-gray-600 hover:bg-primary/5"
                      )}
                    >
                      {link.icon}
                      <span className="ml-3">{link.name}</span>
                      {link.name === "Notifications" &&
                        notificationCount > 0 && (
                          <span className="ml-auto bg-danger text-white text-xs font-semibold px-2 py-1 rounded-full">
                            {notificationCount > 99 ? "99+" : notificationCount}
                          </span>
                        )}
                    </Link>
                  </motion.div>
                ))}
                <motion.div variants={itemVariants} className="relative">
                  <Link
                    href={"/user/user-myAccount"}
                    onClick={() => {
                      setActiveLink("/user/user-myAccount");
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "flex items-center px-4 py-3 rounded-lg transition-colors",
                      activeLink === "/user/user-myAccount"
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-gray-600 hover:bg-primary/5"
                    )}
                  >
                    <User className="h-5 w-5" />
                    <span className="ml-3">My Account</span>
                  </Link>
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  className="border-t border-light-border-subtle pt-4 mt-4"
                >
                  <Button
                    onClick={handleLogOut}
                    disabled={loading}
                    variant="default"
                    className="w-full justify-start text-white hover:text-primary hover:bg-white"
                  >
                    <LogOut
                      className={`mr-3 h-4 w-4 ${
                        loading ? "animate-spin" : ""
                      }`}
                    />
                    <span className="hidden sm:inline">
                      {loading ? "Logging Out..." : "Logout"}
                    </span>
                    <span className="sm:hidden">
                      {loading ? "..." : "Logout"}
                    </span>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default UserNavbar;
