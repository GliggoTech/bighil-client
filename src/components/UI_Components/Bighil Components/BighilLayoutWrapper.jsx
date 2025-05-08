"use client";

import { useState } from "react";
import Bighil_Sidebar from "@/components/UI_Components/Bighil Components/Bighil_Sidebar";
import Bighil_Navbar from "@/components/UI_Components/Bighil Components/Bighil_Navbar";
import { Toaster } from "@/components/ui/toaster";

const BighilLayoutWrapper = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Bighil_Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex flex-col flex-1">
        <Bighil_Navbar isOpen={isOpen} />
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

export default BighilLayoutWrapper;
