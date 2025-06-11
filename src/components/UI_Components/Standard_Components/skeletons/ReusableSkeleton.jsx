import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ReusableSkeleton = ({
  variant = "default",
  className = "",
  rows = 3,
  showHeader = true,
  showActions = false,
  containerClassName = "",
  ...props
}) => {
  const skeletonVariants = {
    // Card layout with header and content
    card: (
      <div className={`rounded-lg bg-card p-6 ${containerClassName}`}>
        {showHeader && (
          <div className="mb-4 space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        )}
        <div className="space-y-3">
          {Array.from({ length: rows }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
        {showActions && (
          <div className="mt-4 flex gap-2">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-20" />
          </div>
        )}
      </div>
    ),

    // Table layout
    table: (
      <div className={`rounded-lg  bg-card ${containerClassName}`}>
        {showHeader && (
          <div className=" p-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-48" />
              {showActions && <Skeleton className="h-9 w-24" />}
            </div>
          </div>
        )}
        <div className="p-4 space-y-4">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-8 w-16" />
            </div>
          ))}
        </div>
      </div>
    ),

    // List layout
    list: (
      <div className={`space-y-4 ${containerClassName}`}>
        {showHeader && (
          <div className="mb-6">
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>
        )}
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="flex items-center space-x-4 p-4  rounded-lg"
          >
            <Skeleton className="h-12 w-12 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            {showActions && <Skeleton className="h-8 w-8 rounded" />}
          </div>
        ))}
      </div>
    ),

    // Grid layout
    grid: (
      <div className={containerClassName}>
        {showHeader && (
          <div className="mb-6">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-72" />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className=" rounded-lg p-4 space-y-4">
              <Skeleton className="h-32 w-full rounded" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              {showActions && (
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-16" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    ),

    // Dashboard stats layout
    stats: (
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${containerClassName}`}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className=" rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-8 w-8 rounded" />
              <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-8 w-20 mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    ),

    // Form layout
    form: (
      <div className={`max-w-2xl space-y-6 ${containerClassName}`}>
        {showHeader && (
          <div className="mb-6">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>
        )}
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
        {showActions && (
          <div className="flex gap-3 pt-4">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-20" />
          </div>
        )}
      </div>
    ),

    // Simple default layout
    default: (
      <div className={`space-y-4 ${containerClassName}`}>
        {showHeader && <Skeleton className="h-8 w-64 mb-4" />}
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
    ),
  };

  return (
    <div className={className} {...props}>
      {skeletonVariants[variant]}
    </div>
  );
};

export default ReusableSkeleton;
