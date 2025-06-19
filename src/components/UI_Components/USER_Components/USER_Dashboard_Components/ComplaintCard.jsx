import React from "react";
import { FileText, Hash, Building, AlertCircle } from "lucide-react";
import Link from "next/link";
import StatusBadge from "../../Standard_Components/StatusBadge";
import { formatDate } from "@/lib/formatDateFun";
import { FcDepartment } from "react-icons/fc";
const ComplaintCard = ({ complaint }) => {
  return (
    <div className="group relative p-0 bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden">
      {/* Header Section with gradient background */}
      <div className="p-4 bg-gradient-to-r from-primary to-success border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="md:text-xl text-base font-bold text-white">
            Complaint Details
          </h3>
          <StatusBadge
            status={
              complaint.status_of_client == "Pending Authorization"
                ? "In Progress"
                : complaint.status_of_client
            }
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4">
        {/* Company and ID Section */}
        <div className="flex flex-col space-y-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo/10 rounded-lg">
              <Building className="w-5 h-5 text-indigo" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Company Name
              </div>
              <div className="text-lg font-semibold text-text_color dark:text-white">
                {complaint.companyName}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2 bg-cyan/10 rounded-lg">
              <Hash className="w-5 h-5 text-cyan" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Complaint ID
              </div>
              <div className="text-primary font-mono text-sm">
                {complaint.complaintId || "N/A"}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange/10 rounded-lg">
              <AlertCircle className="w-5 h-5 text-orange" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Submission Type
              </div>
              <div className="text-gray-700 dark:text-gray-300 font-medium">
                {complaint.submissionType}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-cyan/10 rounded-lg">
              <FcDepartment className="w-5 h-5 text-cyan" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Department
              </div>
              <div
                className={`text-gray-700 dark:text-gray-300 font-medium ${
                  complaint.department?.length > 2 ? "text-xs" : "text-sm"
                }`}
              >
                {/* {complaint.department} */}
                {complaint.department.length > 0 &&
                  complaint.department.map((dep, index) => (
                    <span key={index}>
                      {index === complaint.department.length || index === 0
                        ? ""
                        : ", "}
                      {dep}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

        {/* Complaint Message */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Description
            </h4>
          </div>
          <p className="text-sm leading-relaxed line-clamp-3 pl-6 text-gray-700 dark:text-gray-300">
            {complaint.complaintMessage}
          </p>
        </div>

        {/* Date and View Button */}
        <div className="flex items-center justify-between pt-2">
          {complaint.createdAt && (
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
              <span className="bg-success-bg-subtle text-success px-2 py-1 rounded-full">
                Filed on {formatDate(complaint.createdAt)}
              </span>
            </div>
          )}

          <Link href={`/user/my-complaints/${complaint._id}`}>
            <button className="px-2 py-1 bg-primary hover:bg-success text-white rounded-lg transition-colors duration-300 text-sm font-medium flex items-center space-x-1">
              <span>View</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComplaintCard;
