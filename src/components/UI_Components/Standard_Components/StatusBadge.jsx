import {
  AlertCircle,
  Clock,
  CheckCircle2,
  ThumbsDown,
  HelpCircle,
} from "lucide-react";

const statusConfig = {
  pending: {
    color:
      "bg-amber-100 text-amber-800 dark:bg-amber-700/20 dark:text-amber-300",
    icon: <AlertCircle className="w-4 h-4" />,
  },
  "in progress": {
    color: "bg-sky-100 text-sky-800 dark:bg-sky-700/20 dark:text-sky-300",
    icon: <Clock className="w-4 h-4" />,
  },
  unwanted: {
    color: "bg-rose-100 text-rose-800 dark:bg-rose-700/20 dark:text-rose-300",
    icon: <ThumbsDown className="w-4 h-4" />,
  },
  resolved: {
    color:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-700/20 dark:text-emerald-300",
    icon: <CheckCircle2 className="w-4 h-4" />,
  },
  default: {
    color:
      "bg-slate-100 text-slate-800 dark:bg-slate-700/20 dark:text-slate-300",
    icon: <HelpCircle className="w-4 h-4" />,
  },
};

export default function StatusBadge({ status }) {
  const normalizedStatus =
    status?.toLowerCase().replace(/_/g, " ") || "default";
  const { color, icon } =
    statusConfig[normalizedStatus] || statusConfig.default;

  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${color}`}
    >
      {icon}
      <span className="ml-2 capitalize">
        {normalizedStatus.replace(/-/g, " ")}
      </span>
    </div>
  );
}
