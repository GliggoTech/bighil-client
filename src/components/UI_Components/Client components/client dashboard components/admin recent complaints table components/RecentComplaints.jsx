import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/formatDateFun";
import { getPriorityBadge, getStatusBadge } from "@/utils/complaintBadges";
import { Calendar, AlertCircle, FileText, ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";

const RecentComplaints = ({ complaints = [] }) => {
  return (
    <div className="overflow-x-auto">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <TableHead className="w-[140px] sm:w-[160px] py-2 px-4 font-semibold text-gray-700 dark:text-gray-300">
              Complaint ID
            </TableHead>
            <TableHead className="w-[120px] sm:w-[140px] py-2 px-4 font-semibold text-gray-700 dark:text-gray-300">
              Status
            </TableHead>
            <TableHead className="min-w-[140px] sm:min-w-[160px] py-2 px-4 font-semibold text-gray-700 dark:text-gray-300">
              Created At
            </TableHead>
            <TableHead className="hidden lg:table-cell w-[120px] py-2 px-4 text-center font-semibold text-gray-700 dark:text-gray-300">
              Priority
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {complaints.map((complaint, index) => {
            const status = complaint?.status_of_client || "Unknown";
            const priority = complaint?.priority || "LOW";
            const complaintId = complaint?.complaintId || "N/A";
            const createdAt = complaint?.createdAt
              ? formatDate(complaint.createdAt)
              : "N/A";
            const isLast = index === complaints.length - 1;

            const statusBadge = getStatusBadge(status);
            const priorityBadge = getPriorityBadge(priority);

            return (
              <TableRow
                key={complaint._id || Math.random()}
                className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200 group ${
                  !isLast ? "border-b border-gray-200 dark:border-gray-700" : ""
                }`}
              >
                <TableCell className="py-2 px-4">
                  <div className="flex flex-col gap-1">
                    <Link
                      href={`/client/client-complaints/${complaint._id}`}
                      className="text-primary hover:text-primary/80 font-medium text-sm transition-colors duration-200 flex items-center gap-1 group-hover:gap-2"
                    >
                      <span className="truncate">{complaintId}</span>
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all duration-200 flex-shrink-0" />
                    </Link>
                    {/* Show priority badge on mobile */}
                    <div className="lg:hidden mt-1">
                      <div
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${priorityBadge.bgColor} ${priorityBadge.textColor} ${priorityBadge.borderColor}`}
                      >
                        {priority}
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="py-2 px-4">
                  <div
                    className={`inline-flex items-center ${statusBadge.padding} rounded-full text-xs font-medium border ${statusBadge.bgColor} ${statusBadge.textColor} ${statusBadge.borderColor} transition-all duration-200 hover:scale-105`}
                  >
                    <span className="flex-shrink-0 mr-1">
                      {statusBadge.icon}
                    </span>
                    <span className="truncate">{status}</span>
                  </div>
                </TableCell>

                <TableCell className="py-2 px-4">
                  <div className="inline-flex items-center text-gray-600 dark:text-gray-400 text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                    <span className="whitespace-nowrap">{createdAt}</span>
                  </div>
                </TableCell>

                <TableCell className="hidden lg:table-cell py-2 px-4 text-center">
                  <div
                    className={`inline-flex items-center justify-center px-3 py-1.5 min-w-[80px] rounded-full text-xs font-medium border ${priorityBadge.bgColor} ${priorityBadge.textColor} ${priorityBadge.borderColor} transition-all duration-200 hover:scale-105`}
                  >
                    {priority}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentComplaints;
