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
} from "lucide-react";

export default function DashboardCard({ metrics }) {
  const cards = [
    {
      title: "Total Complaints",
      value: metrics.totalComplaints,
      icon: <ClipboardList className="h-6 w-6 text-green-600" />,
      description: "All-time complaints",
      color: "bg-green-50",
    },
    {
      title: "This Week",
      value: metrics.thisWeekComplaints,
      icon: <Calendar className="h-6 w-6 text-emerald-600" />,
      description: "New complaints this week",
      color: "bg-emerald-50",
    },
    {
      title: "Today",
      value: metrics.todayComplaints,
      icon: <Clock className="h-6 w-6 text-teal-600" />,
      description: "New complaints today",
      color: "bg-teal-50",
    },
    {
      title: "In Progress",
      value: metrics.inProgressComplaints,
      icon: <Activity className="h-6 w-6 text-blue-600" />,
      description: "Currently being processed",
      color: "bg-blue-50",
    },
    {
      title: "Resolved",
      value: metrics.resolvedComplaints,
      icon: <CheckCircle className="h-6 w-6 text-green-600" />,
      description: "Successfully closed complaints",
      color: "bg-green-50",
    },
    {
      title: "Unwanted",
      value: metrics.unwantedComplaints,
      icon: <XCircle className="h-6 w-6 text-red-600" />,
      description: "Marked as unwanted",
      color: "bg-red-50",
    },
    {
      title: "Critical Priority",
      value: metrics.criticalPriorityComplaints,
      icon: <AlertTriangle className="h-6 w-6 text-amber-600" />,
      description: "Urgent attention required",
      color: "bg-amber-50",
    },
    {
      title: "Avg. Resolution Time",
      value: `${metrics.avgResolutionTime} days`,
      icon: <Clock className="h-6 w-6 text-indigo-600" />,
      description: "Average time to resolve",
      color: "bg-indigo-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <Card
          key={index}
          className={`border-green-100 shadow-sm hover:shadow-md transition-shadow ${card.color}`}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-green-800">
              {card.title}
            </CardTitle>
            {card.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {card.value}
            </div>
            <p className="text-xs text-green-700 mt-1">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
