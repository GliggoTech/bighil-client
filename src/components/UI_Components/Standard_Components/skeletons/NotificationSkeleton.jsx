"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const NotificationSkeleton = () => {
  const skeletonRows = Array.from({ length: 6 }); // show 5 rows while loading

  return (
    <div className="bg-white rounded-lg shadow-md max-w-5xl mx-auto overflow-hidden animate-pulse">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 p-2 sm:p-4">
        Notifications
      </h2>
      <Table className="w-full border-none ">
        <TableHeader className="border-none">
          <TableRow className="border-none">
            <TableHead className="text-text_color font-medium sm:uppercase">
              Message
            </TableHead>
            <TableHead className="text-text_color font-medium sm:uppercase">
              Complaint
            </TableHead>
            <TableHead className="text-text_color font-medium sm:uppercase">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {skeletonRows.map((_, index) => (
            <TableRow key={index} className="border-none">
              <TableCell>
                <Skeleton className="h-4 w-full max-w-[250px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-full max-w-[150px]" />
              </TableCell>
              <TableCell className="flex gap-2">
                <Skeleton className="h-8 w-20 rounded-md" />
                <Skeleton className="h-8 w-20 rounded-md" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default NotificationSkeleton;
