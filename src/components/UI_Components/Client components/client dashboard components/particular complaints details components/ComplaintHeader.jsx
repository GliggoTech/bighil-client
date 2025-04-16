import { Badge } from "@/components/ui/badge";
import { getPriorityBadge } from "@/utils/complaintBadges";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const ComplaintHeader = ({ complaint, userRole }) => {
  const priorityBadge = getPriorityBadge(complaint.priority);
  const redirectLink =
    userRole != "user" ? "/client/client-complaints" : "/user/my-complaints";

  return (
    <div
      className="relative overflow-hidden bg-surface-light dark:bg-surface-dark rounded-2xl p-6 
                    shadow-lg border border-border-light dark:border-border-dark
                    transition-all duration-300 ease-in-out group"
    >
      {/* Decorative gradient background */}
      <div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r 
                      from-primary-light via-secondary to-accent-info opacity-75"
      />

      {/* Header Content */}
      <div className="relative z-10">
        {/* Top Navigation Row */}
        <div className="flex items-center justify-between">
          <Link
            href={redirectLink}
            className="flex items-center gap-2 px-4 py-2 rounded-lg
                       text-text-secondary dark:text-text-muted
                       hover:text-primary hover:dark:text-primary-light
                       transition-colors duration-200 ease-in-out
                       hover:bg-background-secondary dark:hover:bg-surface-medium/10"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Back to Complaints</span>
          </Link>

          <Badge
            className={`
              ${priorityBadge.bgColor} 
              ${priorityBadge.textColor} 
              ${priorityBadge.borderColor} 
              ${priorityBadge.padding}
              shadow-sm
              transition-all duration-300
              animate-in fade-in
              text-sm font-semibold
              cursor-default
              hover:scale-105
            `}
          >
            {complaint.priority}
          </Badge>
        </div>

        {/* Complaint Information */}
        <div className="mt-8 space-y-3">
          {/* Company Name */}
          <div className="space-y-1">
            <h1
              className="text-3xl font-bold 
                         text-text-primary dark:text-text-light
                         tracking-tight"
            >
              {complaint.companyName}
            </h1>
            <div className="h-1 w-20 bg-primary/20 dark:bg-primary-light/20 rounded-full" />
          </div>

          {/* Complaint Title */}
          <p
            className="text-lg text-text-secondary dark:text-text-muted
                      leading-relaxed max-w-3xl"
          >
            {complaint.complaintAgainst}
          </p>

          {/* Optional: Additional Metadata */}
          <div className="flex items-center gap-4 pt-4 text-sm text-text-muted dark:text-text-muted">
            {/* <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-info" />
              <span>Complaint ID: {complaint._id?.slice(-6)}</span>
            </div> */}
            {complaint.createdAt && (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-warning" />
                <span>
                  {new Date(complaint.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Decorative corner accent */}
      <div
        className="absolute bottom-0 right-0 w-20 h-20 
                    bg-gradient-to-tl from-primary-light/5 to-transparent 
                    dark:from-primary-dark/10 rounded-tl-3xl"
      />
    </div>
  );
};

export default ComplaintHeader;
