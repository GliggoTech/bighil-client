export default function AdminDashboardLayout({
  children,
  stats,
  complaint_chart,
  recent_complaints,
  recent_notifications,
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Decorative top wave pattern */}
      <div className="absolute top-0 left-0 right-0 h-24 overflow-hidden z-0 opacity-50">
        <svg
          className="absolute bottom-0 w-full h-20 fill-blue-500/10 dark:fill-blue-950/30"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
        {/* Main Content Area */}
        <div className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-lg">
          <div className="flex-1">{children}</div>
        </div>

        {/* Stats Section with Enhanced Card Grid */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-3"></div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Dashboard Overview
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {stats}
          </div>
        </div>

        {/* Chart Section with Enhanced Styling */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="h-8 w-1 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full mr-3"></div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Complaint Analytics
            </h2>
          </div>
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-xl">
            {complaint_chart}
          </div>
        </div>

        {/* Recent Activities Section with Enhanced Grid */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="h-8 w-1 bg-gradient-to-b from-amber-500 to-orange-600 rounded-full mr-3"></div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Recent Activities
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="px-1 py-1 bg-gradient-to-r from-blue-500/10 to-indigo-600/10 dark:from-blue-500/20 dark:to-indigo-600/20">
                <div className="p-5">{recent_complaints}</div>
              </div>
            </div>
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="px-1 py-1 bg-gradient-to-r from-teal-500/10 to-green-600/10 dark:from-teal-500/20 dark:to-green-600/20">
                <div className="p-5">{recent_notifications}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative floating elements */}
      <div className="fixed hidden lg:block bottom-10 right-10 w-64 h-64 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl z-0"></div>
      <div className="fixed hidden lg:block top-20 left-10 w-72 h-72 bg-gradient-to-tr from-amber-500/5 to-pink-500/5 rounded-full blur-3xl z-0"></div>

      {/* Dot pattern background */}
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.1) 1px, transparent 0)",
            backgroundSize: "40px 40px",
            backdropFilter: "blur(0px)",
          }}
        ></div>
      </div>
    </div>
  );
}

// Example usage in a page component
