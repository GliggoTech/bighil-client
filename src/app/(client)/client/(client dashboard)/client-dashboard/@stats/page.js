// src/components/dashboard/stats/AdminStats.jsx

import DashboardCard from "@/components/UI_Components/Bighil Components/bighil dashboard components/DashboardCard";
import { fetchServerSideData } from "@/utils/fetchServerSideData";
import { ClipboardList, Clock, Calendar, Activity } from "lucide-react";

export const dynamic = "force-dynamic";

const ICON_CONFIG = {
  total: {
    icon: ClipboardList,
    color: "blue",
  },
  pending: {
    icon: Calendar,
    color: "purple",
  },
  inProgress: {
    icon: Clock,
    color: "pink",
  },
  unwanted: {
    icon: Activity,
    color: "orange",
  },
};

export default async function AdminStats() {
  const stats = await fetchServerSideData(
    "/api/client-dashboard/stats?timeframe=7",
    {
      method: "GET",
      cache: "no-cache",
    }
  );

  const cards = Object.entries(ICON_CONFIG).map(
    ([key, { icon: Icon, color }]) => ({
      title: `${key.replace(/([A-Z])/g, " $1")} Complaints`.replace(
        /^\w/,
        (c) => c.toUpperCase()
      ),
      value: stats[key]?.count || 0,
      icon: <Icon className={`h-5 w-5 text-${color}`} />,
      color: "bg-white",
      hoverBorderColor: `hover:border-${color}`,
      iconBg: `bg-${color}/30`,
      iconOuterBg: `bg-${color}/20`,
      iconColor: `text-${color}`,
      percentage: stats[key]?.percentage,
      trend: stats[key]?.trend,
    })
  );

  return <DashboardCard cards={cards} />;
}
