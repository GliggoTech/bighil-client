// utils/complaintBadges.js
import {
  AlertCircle,
  AlertCircleIcon,
  CheckCircle2,
  Clock,
} from "lucide-react";

export const getStatusBadge = (status) => {
  const badges = {
    Pending: {
      icon: <Clock className="mr-1 h-3 w-3 text-accent-warning" />,
      bgColor: "bg-accent-warning bg-opacity-10",
      textColor: "text-accent-warning font-bold",
      borderColor: "border-accent-warning border-opacity-20",
      padding: "px-2.5 py-1",
    },
    Resolved: {
      icon: <CheckCircle2 className="mr-1 h-3 w-3 text-accent-success" />,
      bgColor: "bg-accent-success bg-opacity-10",
      textColor: "text-accent-success",
      borderColor: "border-accent-success border-opacity-20",
      padding: "px-2.5 py-1",
    },
    "In Progress": {
      icon: <AlertCircle className="mr-1 h-3 w-3 text-primary" />,
      bgColor: "bg-primary bg-opacity-10",
      textColor: "text-primary",
      borderColor: "border-primary border-opacity-20",
      padding: "px-2.5 py-1",
    },
    Unwanted: {
      icon: <AlertCircleIcon className="mr-1 h-3 w-3 text-accent-danger" />,
      bgColor: "bg-accent-danger bg-opacity-10",
      textColor: "text-accent-danger",
      borderColor: "border-accent-danger border-opacity-20",
      padding: "px-2.5 py-1",
    },
  };

  return badges[status] || badges["Pending"];
};

export const getPriorityBadge = (priority) => {
  const badges = {
    HIGH: {
      bgColor: "bg-orange-50 dark:bg-orange-950/50",
      textColor: "text-orange-700 dark:text-orange-400",
      borderColor: "border-orange-200 dark:border-orange-900",
      padding: "px-2.5 py-1",
    },
    MEDIUM: {
      bgColor: "bg-accent-warning bg-opacity-10",
      textColor: "text-accent-warning",
      borderColor: "border-accent-warning border-opacity-20",
      padding: "px-2.5 py-1",
    },
    LOW: {
      bgColor: "bg-accent-success bg-opacity-10",
      textColor: "text-accent-success",
      borderColor: "border-accent-success border-opacity-20",
      padding: "px-2.5 py-1",
    },
    CRITICAL: {
      bgColor: "bg-accent-danger bg-opacity-10",
      textColor: "text-accent-danger",
      borderColor: "border-accent-danger border-opacity-20",
      padding: "px-2.5 py-1",
    },
  };

  return badges[priority] || badges["MEDIUM"];
};
