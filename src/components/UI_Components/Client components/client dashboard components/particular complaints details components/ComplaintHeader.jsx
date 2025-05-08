import { Badge } from "@/components/ui/badge";
import { getPriorityBadge } from "@/utils/complaintBadges";
import { ArrowLeft, Building, Calendar, Hash, User } from "lucide-react";
import Link from "next/link";
import SectionHeading from "./SectionHeading";

const ComplaintHeader = ({ complaint, userRole }) => {
  const priorityBadge = getPriorityBadge(complaint.priority);
  let redirectLink;
  switch (userRole) {
    case "BIGHIL":
      redirectLink = "/bighil/bighil-complaints";
      break;
    case "ADMIN":
    case "SUPER ADMIN":
    case "SUB ADMIN":
      redirectLink = "/client/client-complaints";
      break;

    default:
      redirectLink = "/user/my-complaints";
  }

  return (
    <div
      className="relative overflow-hidden  dark:bg-surface-dark -2xl p-3 
                     border border-dialog_inside_border_color dark:border-border-dark
                    transition-all duration-300 ease-in-out group"
    >
      {/* Header Content */}
      <div className="relative z-10">
        {/* Top Navigation Row */}
        <div className="flex items-center justify-between">
          <Link
            href={redirectLink}
            className="flex items-center gap-2 px-2 py-2 rounded-lg
                       text-text_color dark:text-text-muted
                       hover:text-text_color bg-back_bg  hover:dark:text-primary-light
                       transition-colors duration-200 ease-in-out
                       hover:bg-primary/30 dark:hover:bg-surface-medium/10"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-light">Back </span>
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
              text-sm font-light
              cursor-default
              hover:scale-105
            `}
          >
            {complaint.priority}
          </Badge>
        </div>

        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          <SectionHeading
            label="Company Name"
            title={complaint.companyName}
            icon={<Building className="w-5 h-5" />}
            color="blue"
          />
          <SectionHeading
            label="Complaint Against"
            title={complaint.complaintAgainst}
            icon={<User className="w-5 h-5" />}
            color="pink"
          />
          <SectionHeading
            label="Complaint ID"
            title={complaint.complaintId}
            icon={<Hash className="w-5 h-5" />}
            color="green"
          />
          <SectionHeading
            label="Complaint Filled On"
            title={new Date(complaint.createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
            icon={<Calendar className="w-5 h-5" />}
            color="red"
          />
        </div>
      </div>
    </div>
  );
};

export default ComplaintHeader;
