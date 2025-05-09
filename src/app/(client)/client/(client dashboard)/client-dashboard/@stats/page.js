// src/components/dashboard/stats/AdminStats.jsx

import DashboardCard from "@/components/UI_Components/Bighil Components/bighil dashboard components/DashboardCard";
import { StatsCard } from "@/components/UI_Components/Client components/client dashboard components/StatsCard";
import { STATS_CONFIG } from "@/lib/dashboard constants/dashboard";
import { fetchServerSideData } from "@/utils/fetchServerSideData";
import {
  ClipboardList,
  Clock,
  Calendar,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Activity,
} from "lucide-react";
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
    "/api/client-dashboard/stats?timeframe=7",
    {
      method: "GET",
      cache: "no-cache",
    }
  );
  console.log(stats);

  // Data validation
  if (!stats) {
    return <StatsSkeleton />;
  }
  const cards = [
    {
      title: "Total Complaints",
      value: stats.total.count,
      icon: <ClipboardList className="h-5 w-5 text-blue-600" />,
      // description: "New complaints",
      color: "bg-white",
      hoverBorderColor: "hover:border-blue",
      iconBg: "bg-blue/30",
      iconOuterBg: "bg-blue/20",
      iconColor: "text-blue",
      percentage: stats.total.percentage,
      trend: stats.total.trend,
    },
    {
      title: "Pending Complaints",
      value: stats.pending.count,
      icon: <Calendar className="h-5 w-5 text-purple-600" />,
      // description: "New complaints this week",
      color: "bg-white",
      hoverBorderColor: "hover:border-purple",
      iconBg: "bg-purple/30",
      iconOuterBg: "bg-purple/20",
      iconColor: "text-purple",
      percentage: stats.pending.percentage,
      trend: stats.pending.trend,
    },
    {
      title: "In Progress Complaints",
      value: stats.inProgress.count,
      icon: <Clock className="h-5 w-5 text-pink-600" />,
      // description: "New complaints today",
      color: "bg-white",
      hoverBorderColor: "hover:border-pink",
      iconBg: "bg-pink/30",
      iconOuterBg: "bg-pink/20",
      iconColor: "text-pink",
      percentage: stats.inProgress.percentage,
      trend: stats.inProgress.trend,
    },
    {
      title: "Unwanted Complaints",
      value: stats.unwanted.count,
      icon: <Activity className="h-5 w-5 text-orange-600" />,
      // description: "Currently being processed",
      color: "bg-white",
      hoverBorderColor: "hover:border-orange",
      iconBg: "bg-orange/30",
      iconOuterBg: "bg-orange/20",
      iconColor: "text-orange",
      percentage: stats.unwanted.percentage,
      trend: stats.unwanted.trend,
    },
  ];

  return <DashboardCard cards={cards} />;
}
