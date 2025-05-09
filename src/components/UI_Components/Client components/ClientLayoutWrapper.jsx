"use client";
import React, { useState } from "react";
import Client_Navbar from "./client dashboard components/Client_Navbar";
import Client_Sidebar from "./client dashboard components/Client_Sidebar";
import { Toaster } from "@/components/ui/toaster";

const ClientLayoutWrapper = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
      <Client_Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex flex-col flex-1">
        <Client_Navbar isOpen={isOpen} />
        <main
          className={`overflow-auto  transition-all duration-200 ${
            isOpen ? "ml-[240px]" : "ml-[72px]"
          }`}
        >
          {children}
          <Toaster position="top-right" richColors />
        </main>
      </div>
    </div>
  );
};

export default ClientLayoutWrapper;
