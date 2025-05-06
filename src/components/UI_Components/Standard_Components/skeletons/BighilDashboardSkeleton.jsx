import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const BighilDashboardSkeleton = () => {
  return (
    <div className="p-3 sm:p-4 md:p-6 space-y-2 bg-white rounded-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Total Users Skeleton */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1">
            <Skeleton className="w-9 h-9 rounded-full" />
            <Skeleton className="h-4 w-24 sm:w-28" />
          </div>
          <Skeleton className="h-8 w-24 sm:w-32" />
        </div>

        {/* Today's Active Users Skeleton */}
        <div className="flex flex-col sm:flex-row items-start md:justify-end sm:items-end gap-2 sm:gap-3">
          <div className="flex items-center gap-1">
            <Skeleton className="w-9 h-9 rounded-full" />
            <Skeleton className="h-4 w-36 sm:w-40" />
          </div>
          <Skeleton className="h-8 w-24 sm:w-32" />
        </div>
      </div>

      {/* Signup Chart Skeleton */}
      <Skeleton className="w-full h-[280px] mt-4 rounded-xl" />
    </div>
  );
};

export default BighilDashboardSkeleton;
