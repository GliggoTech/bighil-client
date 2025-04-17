// src/components/dashboard/stats/AdminStats.jsx

import { StatsCard } from "@/components/UI_Components/Client components/client dashboard components/StatsCard";
import { STATS_CONFIG } from "@/lib/dashboard constants/dashboard";
import { fetchServerSideData } from "@/utils/fetchServerSideData";
export const dynamic = "force-dynamic";
const StatsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className="h-32 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"
      />
    ))}
  </div>
);

export default async function AdminStats() {
  const stats = await fetchServerSideData(
    "/api/client-dashboard/stats?timeframe=30",
    {
      method: "GET",
      cache: "no-cache",
    }
  );

  // Data validation
  if (!stats) {
    return <StatsSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-1">
      {STATS_CONFIG.length > 0 &&
        STATS_CONFIG?.map((config) => {
          const statData = stats[config.key];

          return (
            <StatsCard
              key={config.title}
              title={config.title}
              icon={config.icon}
              color={config.color}
              count={statData?.count ?? 0}
              percentage={statData?.percentage ?? 0}
              trend={statData?.trend ?? "neutral"}
            />
          );
        })}
    </div>
  );
}
