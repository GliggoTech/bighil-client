"use client";

import React, { useState } from "react";
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
import { AlertCircle, Calendar, Download, Eye, Loader2, X } from "lucide-react";
import { getPriorityBadge, getStatusBadge } from "@/utils/complaintBadges";
import { pdfDownload } from "@/utils/exportUtils";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Document, Page, pdfjs } from "react-pdf";
import { getBackendUrl } from "@/lib/getBackendUrl";
import useAccessToken from "@/custom hooks/useAccessToken";
import { cn } from "@/lib/utils";
import { IoDocumentSharp } from "react-icons/io5";
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url
// ).toString();
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";
// Add to very top of ComplaintFilter.jsx

const ComplaintsTable = ({
  complaints = [],
  isLoading = false,
  error,
  bighil = false,
}) => {
  const [downloadingId, setDownloadingId] = useState(null);
  const [downloadError, setDownloadError] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);
  const { token } = useAccessToken();
  const [downloadLoading, setDownloadLoading] = useState(false);

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

  // Error state component
  const ErrorState = () => (
    <TableRow>
      <TableCell colSpan={6} className="h-64 text-center">
        <div className="flex flex-col items-center justify-center h-full space-y-3">
          <div className="rounded-full bg-destructive/10 p-3 text-destructive">
            <AlertCircle className="h-8 w-8" />
          </div>
          <h3 className="font-semibold text-lg text-destructive">
            Something went wrong
          </h3>
          <p className="text-muted-foreground max-w-xs">
            We couldn't fetch the complaints data. Please try again later.
          </p>
        </div>
      </TableCell>
    </TableRow>
  );

  // Function to handle direct download
  const handlePdfDownload = async (complaintId) => {
    setDownloadLoading(true);
    setDownloadingId(complaintId);
    setDownloadError(null);
    try {
      await pdfDownload(complaintId);
      setDownloadLoading(false);
      setPreviewOpen(false);
    } catch (error) {
      console.error(error);
      setDownloadError(complaintId);
      setDownloadLoading(false);
    } finally {
      setDownloadingId(null);
      setDownloadLoading(false);
    }
  };

  // Function to handle PDF preview
  const handlePdfPreview = async (complaintId) => {
    setPreviewLoading(true);
    setPreviewError(null);
    setSelectedComplaintId(complaintId);

    try {
      // Here we're assuming you have an API endpoint that returns a PDF URL
      // You'll need to modify this based on your actual API
      const response = await fetch(
        `${getBackendUrl()}/api/export-complaints/${complaintId}/pdf-preview`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Get your access token
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch PDF");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      setPreviewOpen(true);
    } catch (error) {
      console.error(error);
      setPreviewError(complaintId);
    } finally {
      setPreviewLoading(false);
    }
  };

  // Function to handle document loading success
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  return (
    <>
      <div className="rounded-lg  overflow-hidden shadow-sm transition-all hover:shadow-md">
        <div className="p-4 bg-default_bg">
          <Table className="w-full border-b border-b-dialog_inside_border_color border border-dialog_inside_border_color">
            <TableHeader className=" !border-b-[2px] !border-dialog_inside_border_color dark:!border-b-gray-700">
              <TableRow>
                <TableHead className="text-text_color dark:text-text-light font-medium lg:uppercase ">
                  Complaint ID
                </TableHead>
                {bighil ? (
                  <TableHead className="hidden lg:table-cell text-text_color dark:text-text-light font-medium lg:uppercase ">
                    Company Name
                  </TableHead>
                ) : (
                  <TableHead className="hidden lg:table-cell text-text_color dark:text-text-light font-medium lg:uppercase ">
                    Submission Subject
                  </TableHead>
                )}

                <TableHead className="text-text_color dark:text-text-light font-medium lg:uppercase  ">
                  Status
                </TableHead>
                <TableHead className="hidden lg:table-cell text-text_color dark:text-text-light font-medium lg:uppercase  ">
                  Created At
                </TableHead>
                <TableHead className="hidden lg:table-cell text-text_color dark:text-text-light font-medium lg:uppercase">
                  Priority
                </TableHead>

                <TableHead className="text-text_color dark:text-text-light font-medium lg:uppercase   text-center">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableSkeleton />
              ) : error ? (
                <ErrorState />
              ) : complaints?.length === 0 ? (
                <EmptyState />
              ) : (
                complaints.map((complaint, index) => {
                  const statusBadge = getStatusBadge(
                    complaint.status_of_client
                  );

                  const priorityBadge = getPriorityBadge(complaint.priority);

                  return (
                    <TableRow
                      key={complaint._id}
                      className=" hover:bg-gray-200/50 dark:hover:bg-surface-dark/80 border-b border-dialog_inside_border_color dark:border-border-dark animate-fade-in"
                    >
                      <TableCell className="font-medium">
                        <span className="text-primary">
                          {complaint.complaintId}
                        </span>
                      </TableCell>
                      {bighil ? (
                        <TableCell className="hidden lg:table-cell">
                          <div
                            className="max-w-xs truncate"
                            title={complaint.companyName}
                          >
                            {complaint.companyName}
                          </div>
                        </TableCell>
                      ) : (
                        <TableCell className="hidden lg:table-cell">
                          <div
                            className="max-w-xs truncate"
                            title={complaint.complaintAgainst}
                          >
                            {complaint.complaintAgainst}
                          </div>
                        </TableCell>
                      )}

                      <TableCell>
                        <div
                          className={`inline-flex items-center ${statusBadge.padding} rounded-full text-xs font-medium border ${statusBadge.bgColor} ${statusBadge.textColor} ${statusBadge.borderColor}`}
                        >
                          {statusBadge.icon}
                          {complaint.status_of_client}
                        </div>
                      </TableCell>

                      <TableCell className="hidden lg:table-cell">
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

                      <TableCell className="p-2 text-center flex items-center justify-center gap-2">
                        <Link
                          href={
                            bighil
                              ? `/bighil/bighil-complaints/${complaint._id}`
                              : `/client/client-complaints/${complaint._id}`
                          }
                          className="inline-block"
                        >
                          <Button className="w-fit bg-gradient-to-r from-primary to-primary/80 text-white font-light  rounded transition-all duration-300 transform hover:scale-105">
                            <Eye className="h-4 w-4 mr-1 inline md:hidden" />
                            <span className="hidden md:inline">View</span>
                          </Button>
                        </Link>
                        {complaint.status_of_client === "Resolved" && (
                          <div className="">
                            <Button
                              onClick={() => handlePdfPreview(complaint._id)}
                              className="w-fit bg-success/10 text-success text-center py-1 rounded-md hover:bg-white hover:text-primary"
                              disabled={
                                previewLoading &&
                                selectedComplaintId === complaint._id
                              }
                            >
                              {previewLoading &&
                              selectedComplaintId === complaint._id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <>
                                  <IoDocumentSharp className="h-4 w-4 mr-1 inline md:hidden " />
                                  <span className="hidden md:inline">
                                    Preview
                                  </span>
                                </>
                              )}
                            </Button>

                            {previewError === complaint._id && (
                              <p className="text-xs text-red-500 mt-1">
                                Failed to load preview
                              </p>
                            )}
                          </div>
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

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col bg-[#0458B6] text-white border border-blue-300 rounded-2xl shadow-2xl p-4">
          <DialogHeader className="flex flex-row items-center justify-between pb-2 border-b border-white/20">
            <DialogTitle className="text-white text-xl font-bold">
              📄 PDF Preview
            </DialogTitle>
            {/* <Button
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-white/10"
              onClick={() => setPreviewOpen(false)}
            >
              <X className="h-4 w-4 text-white" />
            </Button> */}
          </DialogHeader>

          <div className="flex-1 overflow-auto bg-white/90 rounded-lg p-2 my-1 shadow-inner">
            {pdfUrl ? (
              <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <div className="flex items-center justify-center h-full min-h-[500px]">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                }
                error={
                  <div className="flex flex-col items-center justify-center h-full min-h-[500px] text-red-600">
                    <AlertCircle className="h-12 w-12 mb-2" />
                    <p>Failed to load PDF document</p>
                  </div>
                }
                className="flex justify-center"
              >
                <Page
                  pageNumber={pageNumber}
                  scale={0.9}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="shadow-lg rounded-md"
                />
              </Document>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[500px]">
                <Loader2 className="h-8 w-8 animate-spin text-white" />
              </div>
            )}
          </div>

          {numPages && (
            <div className="flex items-center justify-center gap-4 mt-1 mb-4 text-white">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={() => setPageNumber((page) => Math.max(page - 1, 1))}
                disabled={pageNumber <= 1}
              >
                Previous
              </Button>
              <span className="text-sm font-medium">
                Page {pageNumber} of {numPages}
              </span>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={() =>
                  setPageNumber((page) => Math.min(page + 1, numPages))
                }
                disabled={pageNumber >= numPages}
              >
                Next
              </Button>
            </div>
          )}

          <DialogFooter className="flex justify-between items-center mt-2">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10"
              onClick={() => setPreviewOpen(false)}
            >
              Close
            </Button>
            <Button
              disabled={downloadLoading}
              className={cn(
                "flex items-center justify-center bg-[#95B6ED] hover:bg-[#7DA4E2] text-[#001F3F] font-semibold transition-colors",
                downloadLoading && "opacity-70 cursor-not-allowed"
              )}
              onClick={async () => {
                handlePdfDownload(selectedComplaintId);
              }}
            >
              {downloadLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ComplaintsTable;
