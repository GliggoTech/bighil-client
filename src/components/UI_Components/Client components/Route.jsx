"use client";
import { usePathname } from "next/navigation";
import React from "react";

const Route = ({ path, component }) => {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <div style={{ display: isActive ? "block" : "none" }}>{component}</div>
  );
};

export default Route;
