import DashboardCard from "@/components/UI_Components/Bighil Components/bighil dashboard components/DashboardCard";
import ErrorComponent from "@/components/UI_Components/Bighil Components/bighil dashboard components/ErrorComponent";
import { fetchServerSideData } from "@/utils/fetchServerSideData";
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
export default async function CardsStatusPage() {
  let res;
  try {
    res = await fetchServerSideData("/api/bighil-dashboard/bighil-cards", {
      method: "GET",
      cache: "no-cache",
    });
    if (!res || res.success === false) {
      return <ErrorComponent />;
    }
  } catch (error) {
    return <ErrorComponent />;
  }
  const cards = [
    {
      title: "Total Complaints",
      value: res.totalComplaints,
      icon: <ClipboardList className="h-5 w-5 text-blue" />,
      description: "All-time complaints",
      color: "bg-white",
      hoverBorderColor: "hover:border-blue",
      iconBg: "bg-blue/30",
      iconOuterBg: "bg-blue/20",
      iconColor: "text-blue",
    },
    {
      title: "This Week",
      value: res.thisWeekComplaints,
      icon: <Calendar className="h-5 w-5 text-purple" />,
      description: "New complaints this week",
      color: "bg-white",
      hoverBorderColor: "hover:border-purple",
      iconBg: "bg-purple/30",
      iconOuterBg: "bg-purple/20",
      iconColor: "text-purple",
    },
    {
      title: "Today",
      value: res.todayComplaints,
      icon: <Clock className="h-5 w-5 text-pink" />,
      description: "New complaints today",
      color: "bg-white",
      hoverBorderColor: "hover:border-pink",
      iconBg: "bg-pink/30",
      iconOuterBg: "bg-pink/20",
      iconColor: "text-pink",
    },
    {
      title: "In Progress",
      value: res.inProgressComplaints,
      icon: <Activity className="h-5 w-5 text-orange" />,
      description: "Currently being processed",
      color: "bg-white",
      hoverBorderColor: "hover:border-orange",
      iconBg: "bg-orange/30",
      iconOuterBg: "bg-orange/20",
      iconColor: "text-orange",
    },
    {
      title: "Resolved",
      value: res.resolvedComplaints,
      icon: <CheckCircle className="h-5 w-5 text-green" />,
      description: "Successfully closed complaints",
      color: "bg-white",
      hoverBorderColor: "hover:border-green",
      iconBg: "bg-green/30",
      iconOuterBg: "bg-green/20",
      iconColor: "text-green",
    },
    {
      title: "Unwanted",
      value: res.unwantedComplaints,
      icon: <XCircle className="h-5 w-5 text-red" />,
      description: "Marked as unwanted",
      color: "bg-white",
      hoverBorderColor: "hover:border-red",
      iconBg: "bg-red/30",
      iconOuterBg: "bg-red/20",
      iconColor: "text-red",
    },
    {
      title: "Critical Priority",
      value: res.criticalPriorityComplaints,
      icon: <AlertTriangle className="h-5 w-5 text-amber" />,
      description: "Urgent attention required",
      color: "bg-white",
      hoverBorderColor: "hover:border-yellow",
      iconBg: "bg-yellow/30",
      iconOuterBg: "bg-yellow/20",
      iconColor: "text-yellow",
    },
    {
      title: "Avg. Resolution Time",
      value: `${res.avgResolutionTime} days`,
      icon: <Clock className="h-5 w-5 text-indigo" />,
      description: "Average time to resolve",
      color: "bg-white",
      hoverBorderColor: "hover:border-indigo",
      iconBg: "bg-indigo/30",
      iconOuterBg: "bg-indigo/20",
      iconColor: "text-indigo",
    },
  ];

  return (
    <div>
      <DashboardCard cards={cards} />
      {/* <h1>Hello</h1> */}
    </div>
  );
}
