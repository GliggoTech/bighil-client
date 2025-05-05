import React from "react";

export default function AdminDashboardLayout({
  children,
  cardStats,
  client_stats,
  userStats,
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50/30 to-white dark:from-neutral-950 dark:via-emerald-950/20 dark:to-neutral-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#059669_0.5px,transparent_1px)]" />
      </div>

      <div className="relative z-10 container mx-auto py-4 max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Content Area */}
        <div
        //   className="mb-8 bg-white/80 dark:bg-neutral-900/80 rounded-3xl shadow-2xl
        // border border-emerald-100/50 dark:border-emerald-900/50 backdrop-blur-lg
        // transition-all duration-300 hover:shadow-2xl"
        >
          <div className="p-1">{children}</div>
        </div>

        {/* Stats Section */}
        <div className="mb-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-1.5 bg-gradient-to-b from-emerald-500 to-emerald-400 rounded-full" />
            <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-200">
              Dashboard Overview
              <span className="ml-3 text-emerald-600 dark:text-emerald-400 text-lg">
                Real-time Insights
              </span>
            </h2>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/5 rounded-2xl -rotate-1 -translate-y-1" />
            {cardStats}
          </div>
        </div>
        <div className=" grid  lg:grid-cols-2 grid-cols-1 gap-4">
          <div className="mb-8 space-y-6">
            <div className="flex items-center gap-3">
              {/* Vertical accent bar with modern green */}
              <div className="h-9 w-1.5 bg-gradient-to-b from-green-600 to-green-400 rounded-full" />

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Clients Overview
                <span className="ml-3 text-green-700 dark:text-green-300 text-lg">
                  Real-time Insights
                </span>
              </h2>
            </div>

            <div className="relative">
              {/* Soft green background with translucent effect */}
              <div className="absolute inset-0 bg-green-100/40 dark:bg-green-900/10 rounded-2xl -rotate-1 -translate-y-1" />

              {client_stats}
            </div>
          </div>
          <div className="mb-8 space-y-6">
            <div className="flex items-center gap-3">
              {/* Vertical accent bar with modern green */}
              <div className="h-9 w-1.5 bg-gradient-to-b from-green-600 to-green-400 rounded-full" />

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Users Overview
                <span className="ml-3 text-green-700 dark:text-green-300 text-lg">
                  Real-time Insights
                </span>
              </h2>
            </div>

            <div className="relative">
              {/* Soft green background with translucent effect */}
              <div className="absolute inset-0 bg-green-100/40 dark:bg-green-900/10 rounded-2xl -rotate-1 -translate-y-1" />

              {userStats}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Accents */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
    </div>
  );
}
