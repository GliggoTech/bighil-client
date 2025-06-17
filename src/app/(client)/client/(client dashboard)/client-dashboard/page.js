"use client";
// Client_dashboard_Page.js - Updated version
import React from "react";
import dynamic from "next/dynamic";
import { SkeletonAdminGreeting } from "@/components/UI_Components/Standard_Components/skeletons/SkeletonAdminGreeting";

// Dynamically import AdminGreeting with no SSR
const AdminGreeting = dynamic(
  () =>
    import(
      "@/components/UI_Components/Client components/client dashboard components/AdminGreeting"
    ),
  {
    ssr: false,
    loading: () => <SkeletonAdminGreeting />,
  }
);

export default function Client_dashboard_Page() {
  return (
    <div>
   
      <AdminGreeting />
    </div>
  );
}
