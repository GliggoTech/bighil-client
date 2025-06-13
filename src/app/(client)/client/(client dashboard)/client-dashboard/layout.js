"use client";

import React from "react";
import "../../../../globals.css";
import { Toaster } from "@/components/ui/toaster";

export default function AdminDashboardLayout({
  children,
  stats,
  complaint_chart,
  recent_complaints,
  recent_notifications,
  categoryStats,
  moreNumber_of_complaints,
}) {
  return (
    <div className="min-h-screen bg-primary/5 dark:from-neutral-950 dark:via-emerald-950/20 dark:to-neutral-950 relative overflow-hidden">
      <div className="relative  py-4 px-4 sm:px-6 lg:px-8">
        {/* Main Content Area */}
        <div className="p-1">{children}</div>

        {/* Stats Section */}
        <div className="mb-4 space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-1.5 bg-gradient-to-b from-emerald-500 to-emerald-400 rounded-full" />
            <h2 className="text-xl font-medium text-text_color dark:text-emerald-200">
              Dashboard Overview
            </h2>
          </div>
          <div className="relative">
            <div />
            {stats}
          </div>
        </div>

        <div className="mb-4 space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-1.5 bg-gradient-to-b from-emerald-500 to-emerald-400 rounded-full" />
            <h2 className="text-xl font-medium text-text_color dark:text-emerald-200">
              Complaint Analytics
            </h2>
          </div>
          <div className="relative">
            <div />
            {complaint_chart}
          </div>
        </div>
        <div className="mb-4 space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-1.5 bg-gradient-to-b from-emerald-500 to-emerald-400 rounded-full" />
            <h2 className="text-xl font-medium text-text_color dark:text-emerald-200">
              Recent Activities
            </h2>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
            <div className="relative">
              <div />
              {recent_complaints}
            </div>
            <div className="relative">
              <div />
              {recent_notifications}
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-9 w-1.5 bg-gradient-to-b from-emerald-500 to-emerald-400 rounded-full" />
                  <h2 className="text-xl font-medium text-text_color dark:text-emerald-200">
                    Complaint Categories Overview
                  </h2>
                </div>
                <div />

                {categoryStats}
              </div>
              {/* <div className="relative overflow-hidden">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-9 w-1.5 bg-gradient-to-b from-emerald-500 to-emerald-400 rounded-full" />
                  <h2 className="text-xl font-medium text-text_color dark:text-emerald-200">
                    Top 5 Departments with Most Complaints
                  </h2>
                </div>
                <div />

                {moreNumber_of_complaints}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
