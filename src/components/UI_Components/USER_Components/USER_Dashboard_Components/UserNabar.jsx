"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiLogOut, FiBell } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import useNotificationStore from "@/store/notificationStore";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/dashboard constants/SidebarConstants";
import { useRouter } from "next/navigation";
import { userSignout } from "@/app/actions/user.action";
import { LogOut } from "lucide-react";

const UserNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/user/user-add-complaint");
  const { notificationCount } = useNotificationStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const handleLogOut = async () => {
    try {
      setLoading(true);
      const res = await userSignout();
      if (res.success) {
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
    <nav className="bg-light-bg-subtle border-b border-light-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0"
          >
            <span className="text-xl lg:text-2xl font-bold bg-primary bg-clip-text text-transparent">
              BIGHIL
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4 flex-1 justify-center">
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
                      "flex items-center text-base px-2 py-2 rounded-lg transition-colors",
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

          {/* Desktop Logout */}
          <div className="hidden lg:flex">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {/* Logout Button */}
              <Button
                onClick={handleLogOut}
                disabled={loading}
                variant="default"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-4 py-2 h-9 sm:h-10 flex items-center space-x-2 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <span className="hidden sm:inline">
                  {loading ? "Logging Out..." : "Logout"}
                </span>
                <span className="sm:hidden">{loading ? "..." : "Logout"}</span>
                <LogOut
                  className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                />
              </Button>
              {error && <p className="text-red text-sm mt-1">{error}</p>}
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
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
              className="lg:hidden overflow-hidden"
            >
              <motion.div
                variants={menuVariants}
                initial="closed"
                animate="open"
                className="px-2 pt-2 pb-4 space-y-1"
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
                <motion.div
                  variants={itemVariants}
                  className="border-t border-light-border-subtle pt-2 mt-2"
                >
                  <Button
                    onClick={handleLogOut}
                    disabled={loading}
                    variant="default"
                    className="w-full justify-start text-white  hover:text-primary hover:bg-white"
                  >
                    <span className="hidden sm:inline">
                      {loading ? "Logging Out..." : "Logout"}
                    </span>
                    <span className="sm:hidden">
                      {loading ? "..." : "Logout"}
                    </span>
                    <LogOut
                      className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                    />
                    {/* <FiLogOut className="mr-3 h-5 w-5 text-white" />
                    Logout */}
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
