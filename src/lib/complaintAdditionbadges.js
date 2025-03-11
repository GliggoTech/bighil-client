import {
  Check,
  Clock,
  AlertCircle,
  AlertTriangle,
  Calendar,
  RefreshCcw,
} from "lucide-react";
// Get status badge style and icon
export const getStatusBadge = (status) => {
  switch (status) {
    case "Pending":
      return {
        icon: <Clock className="mr-1 h-3 w-3" />,
        bgColor: "bg-accent-warning/10",
        textColor: "text-accent-warning",
        borderColor: "border-accent-warning/20",
      };
    case "In Progress":
      return {
        icon: <AlertCircle className="mr-1 h-3 w-3" />,
        bgColor: "bg-primary/10",
        textColor: "text-primary",
        borderColor: "border-primary/20",
      };
    case "Unwanted":
      return {
        bgColor: "bg-slate-50 dark:bg-slate-900/50",
        textColor: "text-slate-700 dark:text-slate-400",
        borderColor: "border-slate-200 dark:border-slate-800",
        icon: <AlertCircle className="h-3.5 w-3.5 mr-1.5" />,
      };
    case "Resolved":
      return {
        icon: <CheckCircle2 className="mr-1 h-3 w-3" />,
        bgColor: "bg-accent-success/10",
        textColor: "text-accent-success",
        borderColor: "border-accent-success/20",
      };
    default:
      return {
        bgColor: "bg-gray-50 dark:bg-gray-900/50",
        textColor: "text-gray-700 dark:text-gray-400",
        borderColor: "border-gray-200 dark:border-gray-800",
        icon: null,
      };
  }
};

// Get priority badge style and icon
export const getPriorityBadge = (priority) => {
  switch (priority) {
    case "LOW":
      return {
        bgColor: "bg-blue-50 dark:bg-blue-950/50",
        textColor: "text-blue-700 dark:text-blue-400",
        borderColor: "border-blue-200 dark:border-blue-900",
      };
    case "MEDIUM":
      return {
        bgColor: "bg-amber-50 dark:bg-amber-950/50",
        textColor: "text-amber-700 dark:text-amber-400",
        borderColor: "border-amber-200 dark:border-amber-900",
      };
    case "HIGH":
      return {
        bgColor: "bg-orange-50 dark:bg-orange-950/50",
        textColor: "text-orange-700 dark:text-orange-400",
        borderColor: "border-orange-200 dark:border-orange-900",
      };
    case "CRITICAL":
      return {
        bgColor: "bg-red-50 dark:bg-red-950/50",
        textColor: "text-red-700 dark:text-red-400",
        borderColor: "border-red-200 dark:border-red-900",
      };
    default:
      return {
        bgColor: "bg-gray-50 dark:bg-gray-900/50",
        textColor: "text-gray-700 dark:text-gray-400",
        borderColor: "border-gray-200 dark:border-gray-800",
      };
  }
};
