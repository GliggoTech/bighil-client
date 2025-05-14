import React from "react";

export default function AdminDashboardLayout({
  children,
  cardStats,
  client_stats,
  userStats,
  categoryStats,
  complaintsStats,
}) {
  return (
    <div className="min-h-screen bg-primary/10 dark:from-neutral-950 dark:via-emerald-950/20 dark:to-neutral-950 relative overflow-hidden">
      <div className="relative z-10 py-4 px-4 sm:px-6 lg:px-8">
        <div className="p-1">{children}</div>

        {/* Stats Section */}
        <div className="mb-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-1.5 bg-gradient-to-b from-emerald-500 to-emerald-400 rounded-full" />
            <h2 className="text-xl font-medium text-text_color dark:text-emerald-200">
              Dashboard Overview
            </h2>
          </div>
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl -rotate-1 -translate-y-1" />
            {cardStats}
          </div>
        </div>

        <div className="grid  lg:grid-cols-2 2xl:grid-cols-3 grid-cols-1 gap-4">
          {/* Clients Overview */}
          <div className="mb-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-9 w-1.5 bg-gradient-to-b from-emerald-500 to-emerald-400 rounded-full" />
              <h2 className="text-xl font-medium dark:text-white">
                Clients Overview
              </h2>
            </div>
            <div className="relative">
              <div className="absolute inset-0  rounded-2xl -rotate-1 -translate-y-1" />
              {client_stats}
            </div>
          </div>

          {/* Users Overview */}
          <div className="mb-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-9 w-1.5 bg-gradient-to-b from-emerald-500 to-emerald-400 rounded-full" />
              <h2 className="text-xl font-medium dark:text-white">
                Users Overview{" "}
                <span className="text-base font-light text-center  dark:text-white">
                  (Last 7 Days Signups)
                </span>
              </h2>
            </div>
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl -rotate-1 -translate-y-1" />
              {userStats}
            </div>
          </div>
          <div className="mb-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-9 w-1.5 bg-gradient-to-b from-emerald-500 to-emerald-400 rounded-full" />
              <h2 className="text-xl font-medium dark:text-white">
                Category Overview{" "}
                {/* <span className="text-md font-light text-center  dark:text-white">
                  (Last 7 Days Signups)
                </span> */}
              </h2>
            </div>
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl -rotate-1 -translate-y-1" />
              {categoryStats}
            </div>
          </div>
        </div>
        <div className="mb-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-1.5 bg-gradient-to-b from-emerald-500 to-emerald-400 rounded-full" />
            <h2 className="text-xl font-medium dark:text-white">
              Complaints Overview{" "}
              {/* <span className="text-md font-light text-center  dark:text-white">
                  (Last 7 Days Signups)
                </span> */}
            </h2>
          </div>
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl -rotate-1 -translate-y-1" />
            {complaintsStats}
          </div>
        </div>
      </div>
    </div>
  );
}
