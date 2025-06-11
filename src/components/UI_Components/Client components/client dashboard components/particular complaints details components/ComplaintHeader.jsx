import { Badge } from "@/components/ui/badge";
import { getPriorityBadge } from "@/utils/complaintBadges";
import { ArrowLeft, Building, Calendar, Hash, User } from "lucide-react";
import Link from "next/link";
import SectionHeading from "./SectionHeading";
import { FcDepartment } from "react-icons/fc";

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
      className=" overflow-hidden   dark:bg-surface-dark -2xl p-3 
                     dark:border-border-dark
                    transition-all duration-300 ease-in-out group"
    >
      {/* Header Content */}
      <div className=" ">
        {/* Top Navigation Row */}
        <div className="relative flex items-center justify-between">
          <Link
            href={redirectLink}
            className="relative flex items-center gap-2 px-2 py-2 rounded-lg
                       text-text_color dark:text-text-muted
                       hover:text-text_color bg-indigo/20  hover:dark:text-primary-light
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
            label="Complaint ID"
            title={complaint.complaintId}
            icon={<Hash className="w-5 h-5" />}
            color="green"
          />
          <SectionHeading
            label="Company Name"
            title={complaint.companyName}
            icon={<Building className="w-5 h-5" />}
            color="blue"
          />
          <SectionHeading
            label="Department"
            title={complaint.department}
            icon={<FcDepartment className="w-5 h-5" />}
            color="purple"
          />
          <SectionHeading
            label="Submission Subject"
            title={complaint.submissionType}
            icon={<User className="w-5 h-5" />}
            color="pink"
          />
          {(userRole === "ADMIN" ||
            userRole === "SUPER ADMIN" ||
            userRole === "SUB ADMIN" ||
            userRole === "BIGHIL") &&
            complaint.complaintType === "Non-Anonymous" && (
              <SectionHeading
                label="Complaint Type"
                title={complaint.complaintType}
                icon={<FcDepartment className="w-5 h-5" />}
                color="red"
              />
            )}
          {(userRole === "ADMIN" ||
            userRole === "SUPER ADMIN" ||
            userRole === "SUB ADMIN" ||
            userRole === "BIGHIL") &&
            complaint.complaintType === "Non-Anonymous" && (
              <SectionHeading
                label="User Details"
                title={complaint.complaintUser}
                subTitle={complaint.complaintUserEmail}
                icon={<User className="w-5 h-5" />}
                color="yellow"
              />
            )}

          <SectionHeading
            label="Complaint Filled On"
            title={new Date(complaint.createdAt).toLocaleString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true, // use false for 24-hour format
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
