import {
  AlertCircle,
  CheckCircle2,
  Clock,
  ThumbsDown,
  HelpCircle,
  FileText,
} from "lucide-react";
import Link from "next/link";
import StatusBadge from "../../Standard_Components/StatusBadge";

const ComplaintCard = ({ complaint }) => {
  return (
    <div className="group relative p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden">
      {/* Top accent border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />

      <div className="flex flex-col h-full space-y-4">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-100/50 rounded-lg">
              <FileText className="w-6 h-6 text-indigo-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {complaint.companyName}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Against {complaint.complaintAgainst}
              </p>
            </div>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center space-x-2">
          <StatusBadge status={complaint.status_of_client} />
        </div>

        {/* Complaint Details */}
        <div className="flex-1 space-y-3">
          <div className="text-slate-700 dark:text-slate-300">
            <p className="text-sm leading-relaxed line-clamp-4">
              {complaint.complaintMessage}
            </p>
          </div>

          {complaint.createdAt && (
            <div className="text-sm text-slate-500 dark:text-slate-400 italic">
              Filed on{" "}
              {new Date(complaint.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
          <Link href={`/user/my-complaints/${complaint._id}`}>
            <button className="w-full px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors duration-200 font-medium">
              View Case
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComplaintCard;
