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
      icon: <ClipboardList className="h-6 w-6 text-blue-600" />,
      description: "All-time complaints",
      color: "bg-blue-50",
      textColor: "text-blue-800",
      hoverBorderColor: "hover:border-blue-300",
      iconBg: "bg-blue-100/60",
    },
    {
      title: "This Week",
      value: metrics.thisWeekComplaints,
      icon: <Calendar className="h-6 w-6 text-purple-600" />,
      description: "New complaints this week",
      color: "bg-purple-50",
      textColor: "text-purple-800",
      hoverBorderColor: "hover:border-purple-300",
      iconBg: "bg-purple-100/60",
    },
    {
      title: "Today",
      value: metrics.todayComplaints,
      icon: <Clock className="h-6 w-6 text-pink-600" />,
      description: "New complaints today",
      color: "bg-pink-50",
      textColor: "text-pink-800",
      hoverBorderColor: "hover:border-pink-300",
      iconBg: "bg-pink-100/60",
    },
    {
      title: "In Progress",
      value: metrics.inProgressComplaints,
      icon: <Activity className="h-6 w-6 text-orange-600" />,
      description: "Currently being processed",
      color: "bg-orange-50",
      textColor: "text-orange-800",
      hoverBorderColor: "hover:border-orange-300",
      iconBg: "bg-orange-100/60",
    },
    {
      title: "Resolved",
      value: metrics.resolvedComplaints,
      icon: <CheckCircle className="h-6 w-6 text-green-600" />,
      description: "Successfully closed complaints",
      color: "bg-green-50",
      textColor: "text-green-800",
      hoverBorderColor: "hover:border-green-300",
      iconBg: "bg-green-100/60",
    },
    {
      title: "Unwanted",
      value: metrics.unwantedComplaints,
      icon: <XCircle className="h-6 w-6 text-red-600" />,
      description: "Marked as unwanted",
      color: "bg-red-50",
      textColor: "text-red-800",
      hoverBorderColor: "hover:border-red-300",
      iconBg: "bg-red-100/60",
    },
    {
      title: "Critical Priority",
      value: metrics.criticalPriorityComplaints,
      icon: <AlertTriangle className="h-6 w-6 text-amber-600" />,
      description: "Urgent attention required",
      color: "bg-amber-50",
      textColor: "text-amber-800",
      hoverBorderColor: "hover:border-amber-300",
      iconBg: "bg-amber-100/60",
    },
    {
      title: "Avg. Resolution Time",
      value: `${metrics.avgResolutionTime} days`,
      icon: <Clock className="h-6 w-6 text-indigo-600" />,
      description: "Average time to resolve",
      color: "bg-indigo-50",
      textColor: "text-indigo-800",
      hoverBorderColor: "hover:border-indigo-300",
      iconBg: "bg-indigo-100/60",
    },
  ];

  return (
    <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-0">
      {cards.map((card, index) => (
        <Card
          key={index}
          className={`group border-2 border-transparent ${card.color} 
        ${card.hoverBorderColor} backdrop-blur-sm shadow-lg 
        hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 
        dark:bg-neutral-900/80 dark:hover:border-white/20 px-2 py-1`}
        >
          <CardHeader className="flex flex-row items-center justify-between p-0 space-y-0">
            <CardTitle
              className={`text-sm font-semibold ${card.textColor} dark:text-white`}
            >
              {card.title}
            </CardTitle>
            <div
              className={`p-2 rounded-full ${card.iconBg} group-hover:scale-105 transition-transform`}
            >
              {card.icon}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div
              className={`text-3xl font-bold ${card.textColor} dark:text-white`}
            >
              {card.value}
            </div>
            <p className={`text-xs mt-2 ${card.textColor} dark:text-white/80`}>
              {card.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
