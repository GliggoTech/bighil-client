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
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || isMenuOpen
          ? "bg-white shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold text-primary flex items-center">
              <span
                className={
                  scrolled || isMenuOpen ? "text-text_color" : "text-white"
                }
              >
                BigHil
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            {main_Navbar_Values.map((item) => (
              <a
                key={item.title}
                href={item.url}
                className={`font-medium transition-colors duration-300 ${
                  scrolled
                    ? "text-gray-700 hover:text-primary"
                    : "text-white hover:text-white/80"
                }`}
              >
                {item.title}
              </a>
            ))}

            {/* Buttons */}
            <Link
              href="/user/user-login"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                scrolled
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-white text-primary hover:bg-gray-100"
              }`}
            >
              User Login
            </Link>
            <Link
              href="/client/client  -login"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                scrolled
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-white text-primary hover:bg-gray-100"
              }`}
            >
              Company Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden focus:outline-none"
          >
            {isMenuOpen ? (
              <X
                className={
                  scrolled || isMenuOpen ? "text-gray-700" : "text-white"
                }
                size={24}
              />
            ) : (
              <Menu
                className={
                  scrolled || isMenuOpen ? "text-gray-700" : "text-white"
                }
                size={24}
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden bg-white shadow-md absolute top-full w-full py-6 px-6 z-50"
        >
          <div className="flex flex-col space-y-5">
            {main_Navbar_Values.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 text-base hover:text-primary font-medium"
              >
                {item.title}
              </Link>
            ))}
            <Link
              href="/user/user-login"
              onClick={() => setIsMenuOpen(false)}
              className="bg-primary text-white px-4 py-2 rounded-md text-center text-sm font-medium"
            >
              User Login
            </Link>
            <Link
              href="/client/client-login"
              onClick={() => setIsMenuOpen(false)}
              className="bg-primary text-white px-4 py-2 rounded-md text-center text-sm font-medium"
            >
              Company Login
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Main_Navbar;
