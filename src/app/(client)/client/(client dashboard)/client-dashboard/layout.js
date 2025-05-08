"use client";

import React from "react";
import "../../../../globals.css";

export default function AdminDashboardLayout({
  children,
  stats,
  complaint_chart,
  recent_complaints,
  recent_notifications,
  keywords_chart,
  moreNumber_of_complaints,
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background-primary to-background-secondary dark:from-surface-dark dark:to-background-dark relative">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-grid-slate-100  dark:bg-grid-slate-700/25" />
      <div className="absolute inset-0 bg-gradient-to-tr from-primary-light/10 to-secondary-light/10 dark:from-primary-dark/20 dark:to-secondary-dark/20" />

      <div className="relative z-10 container mx-auto py-8 max-w-7xl px-4 sm:px-6">
        {/* Main Content Area */}
        <div className="mb-8 bg-surface-light dark:bg-surface-dark rounded-2xl shadow-lg  p-6 transition-all duration-300 hover:shadow-xl backdrop-blur-lg">
          <div className="flex-1 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold  text-primary-dark">
                Admin Dashboard
              </h1>
              <div className="flex items-center space-x-4">
                {/* Add header actions here if needed */}
              </div>
            </div>
            {children}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center">
            <div className="h-8 w-1 bg-gradient-to-b from-primary to-primary-light rounded-full mr-3" />
            <h2 className="text-xl font-semibold text-text_color dark:text-text-light">
              Dashboard Overview
            </h2>
          </div>
          <div className="">{stats}</div>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex items-center">
            <div className="h-8 w-1 bg-gradient-to-b from-primary-dark to-secondary-dark rounded-full mr-3" />
            <h2 className="text-xl font-semibold text-text_color dark:text-text-light">
              Complaint Analytics
            </h2>
          </div>
          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-lg  p-6 transition-all duration-300 hover:shadow-xl backdrop-blur-lg">
            <div className="bg-gradient-to-r from-background-secondary to-surface-medium dark:from-background-dark dark:to-surface-dark p-1 rounded-xl">
              {complaint_chart}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center">
            <div className="h-8 w-1 bg-gradient-to-b from-accent-warning to-accent-danger rounded-full mr-3" />
            <h2 className="text-xl font-semibold text-text_color dark:text-text-light">
              Recent Activities
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full auto-rows-fr">
            <div className="flex flex-col h-full group bg-surface-light/80 dark:bg-surface-dark rounded-2xl shadow-lg  overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="flex-1 flex flex-col p-1 bg-gradient-to-r from-primary-light/10 to-primary-dark/10 dark:from-primary-light/5 dark:to-primary-dark/5 group-hover:from-primary-light/20 group-hover:to-primary-dark/20 transition-all duration-300">
                <div className="flex-1 p-4 rounded-2xl">
                  {recent_complaints}
                </div>
              </div>
            </div>

            <div className="flex flex-col h-full group bg-surface-light dark:bg-surface-dark rounded-2xl shadow-lg  overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="flex-1 flex flex-col p-1 rounded-2xl bg-gradient-to-r from-secondary-light/10 to-secondary-dark/10 dark:from-secondary-light/5 dark:to-secondary-dark/5 group-hover:from-secondary-light/20 group-hover:to-secondary-dark/20 transition-all duration-300">
                <div className="flex-1 p-4 rounded-2xl">
                  {recent_notifications}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="flex flex-col h-full bg-gradient-to-br from-background-primary/90 to-background-secondary/90 
                  rounded-2xl shadow-lg border border-border-light/20 
                  dark:border-border-dark/20 p-6 transition-all duration-300 
                  hover:shadow-xl hover:shadow-primary/5 backdrop-blur-lg"
            >
              <div className="flex-1 ">{keywords_chart}</div>
            </div>

            <div
              className="flex flex-col h-full bg-gradient-to-br from-background-primary/90 to-background-secondary/90 
                  rounded-2xl shadow-lg border border-border-light/20 
                  dark:border-border-dark/20 p-6 transition-all duration-300 
                  hover:shadow-xl hover:shadow-primary/5 backdrop-blur-lg"
            >
              <div
                className="flex-1 rounded-2xl bg-gradient-to-br from-accent-success/5 to-accent-info/5 
                    dark:from-accent-success/10 dark:to-accent-info/10 h-full"
              >
                {moreNumber_of_complaints}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
