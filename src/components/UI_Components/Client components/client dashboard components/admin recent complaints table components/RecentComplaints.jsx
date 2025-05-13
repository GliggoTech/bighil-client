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
import { Calendar } from "lucide-react";
import Link from "next/link";
import React from "react";

const RecentComplaints = ({ complaints }) => {
  return (
    <div className=" bg-white">
      <Table className="w-full border-b border-b-dialog_inside_border_color border border-dialog_inside_border_color">
        <TableHeader className="bg-white !border-b-[2px] !border-dialog_inside_border_color dark:!border-b-gray-700">
          <TableRow>
            <TableHead className="text-text_color dark:text-text-light font-medium lg:uppercase ">
              Complaint ID
            </TableHead>

            <TableHead className="text-text_color dark:text-text-light font-medium lg:uppercase  ">
              Status
            </TableHead>
            <TableHead className=" text-text_color dark:text-text-light font-medium lg:uppercase  ">
              Created At
            </TableHead>
            <TableHead className="hidden lg:table-cell text-text_color dark:text-text-light font-medium lg:uppercase">
              Priority
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {complaints.length > 0 &&
            complaints.map((complaint, index) => {
              const statusBadge = getStatusBadge(complaint.status_of_client);

              const priorityBadge = getPriorityBadge(complaint.priority);

              return (
                <TableRow
                  key={complaint._id}
                  className="bg-white hover:bg-gray-200/50 dark:hover:bg-surface-dark/80 border-b border-dialog_inside_border_color dark:border-border-dark animate-fade-in"
                >
                  <TableCell className="font-medium">
                    <Link href={`/client/client-complaints/${complaint._id}`}>
                      <span className="text-primary">
                        {complaint.complaintId}
                      </span>
                    </Link>
                  </TableCell>

                  <TableCell>
                    <div
                      className={`inline-flex items-center ${statusBadge.padding} rounded-full text-xs font-medium border ${statusBadge.bgColor} ${statusBadge.textColor} ${statusBadge.borderColor}`}
                    >
                      {statusBadge.icon}
                      {complaint.status_of_client}
                    </div>
                  </TableCell>

                  <TableCell className="">
                    <div className="inline-flex items-center text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5 mr-1.5 text-primary" />
                      {formatDate(complaint.createdAt)}
                    </div>
                  </TableCell>

                  <TableCell className="hidden lg:table-cell">
                    <div
                      className={`text-center px-2.5 py-1 w-24 rounded-full text-xs font-medium border ${priorityBadge.bgColor} ${priorityBadge.textColor} ${priorityBadge.borderColor}`}
                    >
                      {complaint.priority}
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
