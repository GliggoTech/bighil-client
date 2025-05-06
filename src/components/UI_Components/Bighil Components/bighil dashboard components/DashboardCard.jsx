import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ClipboardList,
  Clock,
  Calendar,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Activity,
  Users,
  icons,
} from "lucide-react";

export default function DashboardCard({ metrics }) {
  const cards = [
    {
      title: "Total Complaints",
      value: metrics.totalComplaints,
      icon: <ClipboardList className="h-5 w-5 text-blue-600" />,
      description: "All-time complaints",
      color: "bg-white",
      hoverBorderColor: "hover:border-blue",
      iconBg: "bg-blue/30",
      iconOuterBg: "bg-blue/20",
      iconColor: "text-blue",
    },
    {
      title: "This Week",
      value: metrics.thisWeekComplaints,
      icon: <Calendar className="h-5 w-5 text-purple-600" />,
      description: "New complaints this week",
      color: "bg-white",
      hoverBorderColor: "hover:border-purple",
      iconBg: "bg-purple/30",
      iconOuterBg: "bg-purple/20",
      iconColor: "text-purple",
    },
    {
      title: "Today",
      value: metrics.todayComplaints,
      icon: <Clock className="h-5 w-5 text-pink-600" />,
      description: "New complaints today",
      color: "bg-white",
      hoverBorderColor: "hover:border-pink",
      iconBg: "bg-pink/30",
      iconOuterBg: "bg-pink/20",
      iconColor: "text-pink",
    },
    {
      title: "In Progress",
      value: metrics.inProgressComplaints,
      icon: <Activity className="h-5 w-5 text-orange-600" />,
      description: "Currently being processed",
      color: "bg-white",
      hoverBorderColor: "hover:border-orange",
      iconBg: "bg-orange/30",
      iconOuterBg: "bg-orange/20",
      iconColor: "text-orange",
    },
    {
      title: "Resolved",
      value: metrics.resolvedComplaints,
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      description: "Successfully closed complaints",
      color: "bg-white",
      hoverBorderColor: "hover:border-green",
      iconBg: "bg-green/30",
      iconOuterBg: "bg-green/20",
      iconColor: "text-green",
    },
    {
      title: "Unwanted",
      value: metrics.unwantedComplaints,
      icon: <XCircle className="h-5 w-5 text-red-600" />,
      description: "Marked as unwanted",
      color: "bg-white",
      hoverBorderColor: "hover:border-red",
      iconBg: "bg-red/30",
      iconOuterBg: "bg-red/20",
      iconColor: "text-red",
    },
    {
      title: "Critical Priority",
      value: metrics.criticalPriorityComplaints,
      icon: <AlertTriangle className="h-5 w-5 text-amber-600" />,
      description: "Urgent attention required",
      color: "bg-white",
      hoverBorderColor: "hover:border-amber-300",
      iconBg: "bg-amber/30",
      iconOuterBg: "bg-amber/20",
      iconColor: "text-amber",
    },
    {
      title: "Avg. Resolution Time",
      value: `${metrics.avgResolutionTime} days`,
      icon: <Clock className="h-5 w-5 text-indigo-600" />,
      description: "Average time to resolve",
      color: "bg-white",
      hoverBorderColor: "hover:border-indigo",
      iconBg: "bg-indigo/30",
      iconOuterBg: "bg-indigo/20",
      iconColor: "text-indigo",
    },
  ];

  return (
    <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-0">
      {cards.map((card, index) => (
        <Card
          key={index}
          className={`group border-2 border-transparent ${card.color} 
        ${card.hoverBorderColor} backdrop-blur-sm shadow-lg 
        hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 
        dark:bg-neutral-900/80 dark:hover:border-white/20 px-5 py-1`}
        >
          <CardHeader className="flex flex-row items-center justify-between p-0 space-y-0">
            <CardTitle className={`font-normal   dark:text-white`}>
              {card.title}
            </CardTitle>
            <div className={`p-2 rounded-full ${card.iconOuterBg} `}>
              <div
                className={`p-3 rounded-full ${card.iconColor} ${card.iconBg} group-hover:scale-105 transition-transform`}
              >
                {card.icon}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className={`text-2xl font-bold  dark:text-white`}>
              {card.value}
            </div>
            <p className={`text-xs mt-2  dark:text-white/80`}>
              {card.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
