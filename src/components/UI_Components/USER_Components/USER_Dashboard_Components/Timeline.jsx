// TimelineEvent.tsx
"use client";

import {
  Clock,
  CheckCircle2,
  ThumbsDown,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

const statusConfig = {
  Pending: {
    icon: Clock,
    style: {
      icon: "text-warning dark:text-warning-light",
      bg: "bg-accent-warning/10 dark:bg-accent-warning/20",
      border: "border-accent-warning/20 dark:border-accent-warning/30",
    },
  },
  "In Progress": {
    icon: AlertCircle,
    style: {
      icon: "text-accent-info dark:text-accent-info-light",
      bg: "bg-accent-info/10 dark:bg-accent-info/20",
      border: "border-accent-info/20 dark:border-accent-info/30",
    },
  },
  Unwanted: {
    icon: ThumbsDown,
    style: {
      icon: "text-accent-danger dark:text-accent-danger-light",
      bg: "bg-accent-danger/10 dark:bg-accent-danger/20",
      border: "border-accent-danger/20 dark:border-accent-danger/30",
    },
  },
  Resolved: {
    icon: CheckCircle2,
    style: {
      icon: "text-accent-success dark:text-accent-success-light",
      bg: "bg-accent-success/10 dark:bg-accent-success/20",
      border: "border-accent-success/20 dark:border-accent-success/30",
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

export const TimelineEvent = ({ event, isLast }) => {
  if (!event) return null;
  const status = event.status_of_client || "default";
  const config = statusConfig[status] || statusConfig.default;
  const Icon = config.icon;

  return (
    <li className="relative pb-8">
      {!isLast && (
        <span
          className="absolute left-5 top-8 -ml-px h-full w-0.5 
                   bg-border-light dark:bg-border-dark"
          aria-hidden="true"
        />
      )}

      <div className="relative flex items-start space-x-4 p-4 bg-background-secondary dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark transition-all duration-300 hover:shadow-md">
        <div className="relative flex-shrink-0">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full border ${config.style.border} ${config.style.bg} transition-all duration-300`}
          >
            <Icon
              className={`h-5 w-5 ${config.style.icon}`}
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="min-w-0 flex-1 pt-1">
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-text-primary dark:text-text-light">
                {status === "default" ? "Unknown Status" : status}
              </p>
              {event.message && (
                <p className="text-sm text-text-secondary dark:text-text-muted leading-relaxed">
                  {event.message}
                </p>
              )}
            </div>

            <time
              className="flex-shrink-0 text-sm text-text-muted dark:text-text-muted px-2 py-1 rounded-full bg-background-tertiary dark:bg-surface-dark border border-border-light dark:border-border-dark"
              dateTime={event.timestamp}
            >
              {new Date(event.timestamp).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </div>
        </div>
      </div>
    </li>
  );
};

export default function Timeline({ events }) {
  if (!events?.length) {
    return (
      <div
        className="p-8 text-center rounded-xl
                      bg-surface-light dark:bg-surface-dark
                      border border-border-light dark:border-border-dark"
      >
        <AlertCircle className="w-6 h-6 mx-auto mb-3 text-text-muted dark:text-text-muted" />
        <p className="text-text-secondary dark:text-text-muted">
          No timeline entries found
        </p>
      </div>
    );
  }

  return (
    <div
      className="flow-root bg-surface-light dark:bg-surface-dark 
                    rounded-xl p-6 shadow-sm
                    border border-border-light dark:border-border-dark"
    >
      {/* Optional: Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-text-primary dark:text-text-light">
          Timeline
        </h3>
        <p className="text-sm text-text-secondary dark:text-text-muted">
          Track the progress of this case
        </p>
      </div>

      <ul className="-mb-8">
        {events.map((event, index) => (
          <TimelineEvent
            key={index}
            event={event}
            isLast={index === events.length - 1}
          />
        ))}
      </ul>
    </div>
  );
}
