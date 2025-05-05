import React from "react";

export default function AdminDashboardLayout({ children, cardStats }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background-primary to-background-secondary dark:from-surface-dark dark:to-background-dark relative">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-grid-slate-100  dark:bg-grid-slate-700/25" />
      <div className="absolute inset-0 bg-gradient-to-tr from-primary-light/10 to-secondary-light/10 dark:from-primary-dark/20 dark:to-secondary-dark/20" />

      <div className="relative z-10 container mx-auto py-8 max-w-7xl px-4 sm:px-6">
        {/* Main Content Area */}
        <div className="mb-8 bg-surface-light dark:bg-surface-dark rounded-2xl shadow-lg border border-border-light dark:border-border-dark p-6 transition-all duration-300 hover:shadow-xl backdrop-blur-lg">
          <div className="flex-1 ">
            {/* Header */}
            <div className="flex items-center justify-between ">
              <div className="flex items-center space-x-4">
                {/* Add header actions here if needed */}
              </div>
            </div>
            {children}
          </div>
        </div>

        {/* cardStats Section */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center">
            <div className="h-8 w-1 bg-gradient-to-b from-primary to-primary-light rounded-full mr-3" />
            <h2 className="text-xl font-semibold text-text-primary dark:text-text-light">
              Dashboard Overview
            </h2>
          </div>
          <div className="">{cardStats}</div>
        </div>
      </div>
      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background-primary to-transparent dark:from-background-dark pointer-events-none" />
    </div>
  );
}
