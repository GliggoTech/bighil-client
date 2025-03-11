"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/formatDateFun";

import { AlertCircle, Calendar } from "lucide-react";
import {
  getPriorityBadge,
  getStatusBadge,
} from "@/utils/complaintsAdditionbadges";
import { pdfDownalod } from "@/utils/exportUtils";

const ComplaintsTable = ({ complaints = [], isLoading = false }) => {
  // Loading skeleton component
  const TableSkeleton = () => (
    <TableRow>
      <TableCell colSpan={6} className="h-64 text-center">
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
            <div className="absolute inset-3 rounded-full border-2 border-gray-200 dark:border-gray-800"></div>
          </div>
          <p className="text-muted-foreground font-medium">
            Loading complaints...
          </p>
        </div>
      </TableCell>
    </TableRow>
  );

  // Empty state component
  const EmptyState = () => (
    <TableRow>
      <TableCell colSpan={6} className="h-64 text-center">
        <div className="flex flex-col items-center justify-center h-full space-y-3">
          <div className="rounded-full bg-muted p-3 text-muted-foreground">
            <AlertCircle className="h-8 w-8" />
          </div>
          <h3 className="font-semibold text-lg text-foreground">
            No complaints found
          </h3>
          <p className="text-muted-foreground max-w-xs">
            No complaints match your current filter criteria. Try adjusting your
            filters to see more results.
          </p>
        </div>
      </TableCell>
    </TableRow>
  );

  const handlePdfDownload = async (complaintId) => {
    try {
      await pdfDownalod(complaintId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-lg border border-border overflow-hidden shadow-sm transition-all hover:shadow-md">
      <div className=" p-4">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-semibold text-muted-foreground w-[160px]">
                Complaint ID
              </TableHead>
              {/* <TableHead className="font-semibold text-muted-foreground">
                Company
              </TableHead> */}
              <TableHead className="font-semibold text-muted-foreground">
                Complaint Message
              </TableHead>
              <TableHead className="font-semibold text-muted-foreground w-[140px]">
                Status
              </TableHead>
              <TableHead className="font-semibold text-muted-foreground w-[140px]">
                Created At
              </TableHead>
              <TableHead className="font-semibold text-muted-foreground w-[120px]">
                Priority
              </TableHead>
              <TableHead className="font-semibold text-muted-foreground  text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableSkeleton />
            ) : (
              complaints?.map((complaint) => {
                const statusBadge = getStatusBadge(complaint.status_of_client);
                const priorityBadge = getPriorityBadge(complaint.priority);

                return (
                  <TableRow
                    key={complaint._id}
                    className="table-zoom-in border-b border-border hover:bg-muted/30 transition-colors hover:bg-background-tertiary duration-300"
                  >
                    <TableCell className="font-medium">
                      <span className="text-primary">
                        {complaint.complaintId}
                      </span>
                    </TableCell>

                    {/* <TableCell>
                      <div className="font-medium">{complaint.companyName}</div>
                    </TableCell> */}

                    <TableCell>
                      <div
                        className="max-w-xs truncate"
                        title={complaint.complaintAgainst}
                      >
                        {complaint.complaintAgainst}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusBadge.bgColor} ${statusBadge.textColor} ${statusBadge.borderColor}`}
                      >
                        {statusBadge.icon}
                        {complaint.status_of_client}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="inline-flex items-center text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5 mr-1.5 text-accent-info" />
                        {formatDate(complaint.createdAt)}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div
                        className={`text-center px-2.5 py-1 rounded-full text-xs font-medium border ${priorityBadge.bgColor} ${priorityBadge.textColor} ${priorityBadge.borderColor}`}
                      >
                        {complaint.priority}
                      </div>
                    </TableCell>
                    <TableCell className="p-2 text-center flex items-center justify-center">
                      <div className="">
                        <Link
                          href={`/client/client-complaints/${complaint._id}`}
                          className="inline-block w-full h-full"
                        >
                          <Button className="w-[80%] mx-auto bg-gradient-to-r from-primary to-primary/90 hover:to-blue-700 text-white font-medium py-1.5 rounded transition-all duration-300 transform hover:scale-105">
                            View Case
                          </Button>
                        </Link>
                      </div>
                      {complaint.status_of_client == "Resolved" && (
                        <Button
                          onClick={() => handlePdfDownload(complaint._id)}
                          className="w-fit bg-accent-success/10 text-accent-success text-center py-1 rounded-md  hover:bg-accent-success hover:text-text-light"
                        >
                          Download
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ComplaintsTable;
