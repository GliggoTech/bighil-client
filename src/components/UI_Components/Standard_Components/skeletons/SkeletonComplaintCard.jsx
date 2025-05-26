// components/Skeletons/SkeletonComplaintCard.tsx
"use client";

import { Skeleton } from "@/components/ui/skeleton";

const SkeletonComplaintCard = () => {
  return (
    <div className="p-0 max-w-5xl mx-auto border-none bg-white dark:bg-gray-800 rounded-2xl shadow-xl border overflow-hidden">
      {/* Gradient Header Skeleton */}
      <div className="p-4 bg-gradient-to-r from-primary to-success">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32 bg-white/40 rounded-md" />
          <Skeleton className="h-6 w-16 bg-white/40 rounded-md" />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Info Items */}
        {Array.from({ length: 4 }).map((_, idx) => (
          <div className="flex items-center space-x-3" key={idx}>
            <Skeleton className="w-10 h-10 rounded-lg" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
        ))}

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

        {/* Description */}
        <div className="space-y-2 pl-6">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-4 w-[60%]" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-6 w-28 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonComplaintCard;
