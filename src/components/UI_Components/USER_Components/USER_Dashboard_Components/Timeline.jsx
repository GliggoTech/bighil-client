// TimelineEvent.tsx
"use client";

import { statusConfig } from "@/utils/timeLineColors";
import { AlertCircle, TimerIcon } from "lucide-react";

export const TimelineEvent = ({ event, isLast }) => {
  if (!event) return null;
  const status = event.status_of_client || "default";
  const config = statusConfig[status] || statusConfig.default;
  const Icon = config.icon;

  return (
    <li className="relative pb-8">
      {!isLast && (
        <span
          className="absolute left-8 top-8 -ml-px h-full w-1 
                   bg-primary dark:bg-border-dark"
          aria-hidden="true"
        />
      )}

      <div className="relative flex items-start space-x-4 p-4 bg-default_bg dark:bg-surface-dark rounded-xl  transition-all duration-300 hover:shadow-md">
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
              <p className="text-sm font-medium text-text_color dark:text-text-light">
                {status === "default" ? "Unknown Status" : status}
              </p>
              {event.message && (
                <p className="text-sm text-text-secondary dark:text-text_color leading-relaxed">
                  {event.message}
                </p>
              )}
            </div>

            <time
              className="flex-shrink-0 text-sm text-text_color dark:text-text_color px-2 py-1 rounded-full bg-background-tertiary dark:bg-surface-dark "
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
        className="p-3 text-center rounded-xl
                      bg-light dark:bg-dark
                      "
      >
        <AlertCircle className="w-6 h-6 mx-auto mb-3 text-text_color dark:text-text_color" />
        <p className="text-text-secondary dark:text-text_color">
          No timeline entries found
        </p>
      </div>
    );
  }

  return (
    <div className="relative flow-root bg-white dark:bg-surface-dark rounded-xl p-3 shadow-sm">
      {/* Vertical line background */}
      <div className="absolute left-5 top-0 w-0.5 h-full bg-border-light dark:bg-border-dark z-0" />

      {/* Optional: Header */}
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10  transition-all duration-300">
          <TimerIcon className="h-5 w-5 text-primary " aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-text_color dark:text-text-light">
          Timeline
        </h3>
      </div>
      <p className="text-sm text-text_color dark:text-text_color mt-2 mb-4">
        Track the progress of this case
      </p>

      <ul className="-mb-8 relative z-10">
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
