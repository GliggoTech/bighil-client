import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/formatDateFun";
import { getPriorityBadge, getStatusBadge } from "@/utils/complaintBadges";
import { Calendar, AlertCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

const RecentComplaints = ({ complaints = [] }) => {
  const hasComplaints = complaints.length > 0;

  return (
    <div className="bg-white border border-dialog_inside_border_color rounded-lg overflow-hidden">
      <Table className="w-full border-b border-dialog_inside_border_color">
        <TableHeader className="bg-white !border-b-[2px] !border-dialog_inside_border_color dark:!border-b-gray-700">
          <TableRow>
            <TableHead className="text-text_color dark:text-text-light font-medium lg:uppercase">
              Complaint ID
            </TableHead>
            <TableHead className="text-text_color dark:text-text-light font-medium lg:uppercase">
              Status
            </TableHead>
            <TableHead className="text-text_color dark:text-text-light font-medium lg:uppercase">
              Created At
            </TableHead>
            <TableHead className="hidden lg:table-cell text-text_color dark:text-text-light font-medium lg:uppercase">
              Priority
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {hasComplaints ? (
            complaints.map((complaint) => {
              const status = complaint?.status_of_client || "Unknown";
              const priority = complaint?.priority || "LOW";
              const complaintId = complaint?.complaintId || "N/A";
              const createdAt = complaint?.createdAt
                ? formatDate(complaint.createdAt)
                : "N/A";

              const statusBadge = getStatusBadge(status);
              const priorityBadge = getPriorityBadge(priority);

              return (
                <TableRow
                  key={complaint._id || Math.random()}
                  className="bg-white hover:bg-gray-200/50 dark:hover:bg-surface-dark/80 border-b border-dialog_inside_border_color dark:border-border-dark animate-fade-in"
                >
                  <TableCell className="font-medium">
                    <Link
                      href={`/client/client-complaints/${complaint._id}`}
                      className="text-primary"
                    >
                      {complaintId}
                    </Link>
                  </TableCell>

                  <TableCell>
                    <div
                      className={`inline-flex items-center ${statusBadge.padding} rounded-full text-xs font-medium border ${statusBadge.bgColor} ${statusBadge.textColor} ${statusBadge.borderColor}`}
                    >
                      {statusBadge.icon}
                      {status}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="inline-flex items-center text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5 mr-1.5 text-primary" />
                      {createdAt}
                    </div>
                  </TableCell>

                  <TableCell className="hidden lg:table-cell">
                    <div
                      className={`text-center px-2.5 py-1 w-24 rounded-full text-xs font-medium border ${priorityBadge.bgColor} ${priorityBadge.textColor} ${priorityBadge.borderColor}`}
                    >
                      {priority}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6">
                <div className="flex flex-col items-center text-muted-foreground">
                  <AlertCircle className="w-6 h-6 mb-2 text-gray-400" />
                  <span>No complaints found</span>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentComplaints;
