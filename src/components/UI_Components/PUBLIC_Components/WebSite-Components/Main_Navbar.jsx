"use client";
import { main_Navbar_Values } from "@/lib/dashboard constants/SidebarConstants";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Main_Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed  w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white backdrop-blur-lg shadow-sm py-3 border-b border-dialog_inside_border_color"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`flex items-center transition-all ${
                scrolled ? "gap-2" : "gap-3"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg bg-primary flex items-center justify-center ${
                  scrolled ? "scale-100" : "scale-125"
                }`}
              >
                <span className="text-white font-bold text-lg">BH</span>
              </div>
              <span
                className={`text-xl font-bold ${
                  scrolled ? "text-text_color" : "text-white"
                }`}
              >
                BigHil
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {main_Navbar_Values.map((item) => (
              <motion.a
                key={item.title}
                href={item.url}
                whileHover={{ y: -2 }}
                className={`relative font-medium transition-colors ${
                  scrolled
                    ? "text-gray-700 hover:text-primary"
                    : "text-white hover:text-primary/90"
                }`}
              >
                {item.title}
                {!scrolled && (
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-px bg-white/30"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.a>
            ))}

            <div className="flex gap-4 ml-4">
              <Link
                href="/user/user-login"
                className={`px-4 py-2 rounded-full border transition-all ${
                  scrolled
                    ? "border-primary text-primary hover:bg-primary/5"
                    : "border-white text-white hover:bg-white/10"
                }`}
              >
                User Login
              </Link>
              <Link
                href="/company/login"
                className={`px-4 py-2 rounded-full transition-all ${
                  scrolled
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "bg-white text-primary hover:bg-white/90"
                }`}
              >
                Company Login
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
            className="lg:hidden p-2 rounded-lg focus:outline-none"
          >
            {isMenuOpen ? (
              <X
                className={scrolled ? "text-gray-700" : "text-white"}
                size={28}
              />
            ) : (
              <Menu
                className={scrolled ? "text-gray-700" : "text-white"}
                size={28}
              />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`lg:hidden absolute w-full py-6 px-4 ${
            scrolled ? "bg-white" : "bg-primary"
          } shadow-xl`}
        >
          <div className="flex flex-col gap-4">
            {main_Navbar_Values.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className={`px-4 py-3 rounded-lg transition-colors ${
                  scrolled
                    ? "text-gray-700 hover:bg-primary/10"
                    : "text-white hover:bg-white/10"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            <div className="flex flex-col gap-3 mt-4">
              <Link
                href="/user/user-login"
                className={`px-4 py-3 rounded-full text-center ${
                  scrolled
                    ? "border border-primary text-primary"
                    : "border border-white text-white"
                }`}
              >
                User Login
              </Link>
              <Link
                href="/company/login"
                className={`px-4 py-3 rounded-full text-center ${
                  scrolled ? "bg-primary text-white" : "bg-white text-primary"
                }`}
              >
                Company Login
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Main_Navbar;
