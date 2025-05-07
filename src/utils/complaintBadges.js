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
      icon: <Clock className="mr-1 h-3 w-3 text-orange" />,
      bgColor: "bg-orange/10",
      textColor: "text-orange/90 font-bold",
      borderColor: "border-orange border-opacity-20",
      padding: "px-2.5 py-1 -ml-3",
    },
    Resolved: {
      icon: <CheckCircle2 className="mr-1 h-3 w-3 text-success" />,
      bgColor: "bg-success bg-opacity-10",
      textColor: "text-success",
      borderColor: "border-success border-opacity-20",
      padding: "px-2.5 py-1 -ml-3",
    },
    "In Progress": {
      icon: <AlertCircle className="mr-1 h-3 w-3 text-primary" />,
      bgColor: "bg-primary bg-opacity-10",
      textColor: "text-primary",
      borderColor: "border-primary border-opacity-20",
      padding: "px-2.5 py-1 -ml-3",
    },
    Unwanted: {
      icon: <AlertCircleIcon className="mr-1 h-3 w-3 text-danger" />,
      bgColor: "bg-danger bg-opacity-10",
      textColor: "text-danger",
      borderColor: "border-danger border-opacity-20",
      padding: "px-2.5 py-1 -ml-3",
    },
  };

  return badges[status] || badges["Pending"];
};

export const getPriorityBadge = (priority) => {
  const badges = {
    HIGH: {
      bgColor: "bg-orange/10 dark:bg-orange/20",
      textColor: "text-orange dark:text-orange",
      borderColor: "border-orange dark:border-orange",
      padding: "px-2.5 py-1",
    },
    MEDIUM: {
      bgColor: "bg-yellow/10 dark:bg-yellow/20",
      textColor: "text-yellow dark:text-yellow",
      borderColor: "border-yellow dark:border-yellow",
      padding: "px-2.5 py-1",
    },
    LOW: {
      bgColor: "bg-green/10 dark:bg-green/20",
      textColor: "text-green dark:text-green",
      borderColor: "border-green dark:border-green",
      padding: "px-2.5 py-1",
    },
    CRITICAL: {
      bgColor: "bg-red/10 dark:bg-red/20",
      textColor: "text-red dark:text-red",
      borderColor: "border-red dark:border-red",
      padding: "px-2.5 py-1",
    },
  };

  return badges[priority] || badges["MEDIUM"];
};
