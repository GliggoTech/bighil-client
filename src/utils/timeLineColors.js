import {
  AlertCircle,
  CheckCircle2,
  Clock,
  HelpCircle,
  ThumbsDown,
} from "lucide-react";
import { MdOutlinePendingActions } from "react-icons/md";

export const statusConfig = {
  Pending: {
    icon: Clock,
    style: {
      icon: "text-warning dark:text-warning-light",
      bg: "bg-warning/10 dark:bg-warning/20",
      border: "border-warning/20 dark:border-warning/30",
    },
  },
  "In Progress": {
    icon: AlertCircle,
    style: {
      icon: "text-info dark:text-info-light",
      bg: "bg-info/10 dark:bg-info/20",
      border: "border-info/20 dark:border-info/30",
    },
  },
  Unwanted: {
    icon: ThumbsDown,
    style: {
      icon: "text-danger dark:text-danger-light",
      bg: "bg-danger/10 dark:bg-danger/20",
      border: "border-danger/20 dark:border-danger/30",
    },
  },
  Resolved: {
    icon: CheckCircle2,
    style: {
      icon: "text-success dark:text-success-light",
      bg: "bg-success/10 dark:bg-success/20",
      border: "border-success/20 dark:border-success/30",
    },
  },
  "Pending Authorization": {
    icon: MdOutlinePendingActions ,
    style: {
      icon: "text-warning dark:text-warning-light",
      bg: "bg-warning/10 dark:bg-warning/20",
      border: "border-warning/20 dark:border-warning/30",
    },
  },
  default: {
    icon: HelpCircle,
    style: {
      icon: "text-gray-500 dark:text-gray-400",
      bg: "bg-gray-100 dark:bg-gray-800",
      border: "border-gray-200 dark:border-gray-700",
    },
  },
};
