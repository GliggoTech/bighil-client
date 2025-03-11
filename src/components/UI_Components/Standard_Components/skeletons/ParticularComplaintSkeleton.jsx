"use client";

import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ParticularComplaintSkeleton = () => {
  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Main Container */}
        <div className="bg-background-primary dark:bg-background-dark rounded-2xl shadow-lg border border-border-light dark:border-primary-dark overflow-hidden">
          {/* Header Section Skeleton */}
          <div className="border-b border-border-light dark:border-primary-dark pb-6 bg-background-secondary dark:bg-surface-dark p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <Skeleton className="h-14 w-14 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
              <div className="flex gap-2 flex-wrap w-full sm:w-auto">
                <Skeleton className="h-10 w-24 rounded-md" />
                <Skeleton className="h-10 w-24 rounded-md" />
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content Area */}
              <div className="lg:col-span-2 space-y-8">
                {/* Complaint Details Card Skeleton */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-secondary-dark p-6">
                  <div className="space-y-4">
                    <Skeleton className="h-7 w-48" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-5 w-36" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                      <div className="space-y-3">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-5 w-36" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>
                    <div className="pt-4">
                      <Skeleton className="h-5 w-32" />
                      <div className="mt-2 space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Evidence Gallery Section Skeleton */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-secondary-dark p-6">
                  <div className="space-y-4">
                    <Skeleton className="h-6 w-40" />
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      <Skeleton className="aspect-square rounded-lg" />
                      <Skeleton className="aspect-square rounded-lg" />
                      <Skeleton className="aspect-square rounded-lg" />
                      <Skeleton className="aspect-square rounded-lg" />
                    </div>
                  </div>
                </div>

                {/* Notes Section Skeleton */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-secondary-dark p-6">
                  <div className="space-y-4">
                    <Skeleton className="h-6 w-32" />
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Skeleton className="h-5 w-40" />
                          <Skeleton className="h-5 w-24" />
                        </div>
                        <Skeleton className="h-20 w-full rounded-md" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Skeleton className="h-5 w-40" />
                          <Skeleton className="h-5 w-24" />
                        </div>
                        <Skeleton className="h-20 w-full rounded-md" />
                      </div>
                    </div>
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                </div>
              </div>

              {/* Sidebar Content */}
              <div className="space-y-6">
                {/* Timeline Card Skeleton */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-secondary-dark p-6">
                  <div className="space-y-4">
                    <Skeleton className="h-6 w-28" />
                    <div className="space-y-6">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="flex gap-4">
                          <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
                          <div className="space-y-2 w-full">
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-4 w-full" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Status Selector Skeleton */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-secondary-dark p-6">
                  <div className="space-y-3">
                    <Skeleton className="h-6 w-40" />
                    <div className="flex flex-wrap gap-2">
                      <Skeleton className="h-10 w-24 rounded-md" />
                      <Skeleton className="h-10 w-24 rounded-md" />
                      <Skeleton className="h-10 w-24 rounded-md" />
                    </div>
                  </div>
                </div>

                {/* Action Taken Section Skeleton */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-secondary-dark p-6">
                  <div className="space-y-4">
                    <Skeleton className="h-6 w-36" />
                    <Skeleton className="h-24 w-full rounded-md" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Interface Skeleton */}
          <div className="border-t border-border-light dark:border-accent-success mt-8 bg-background-secondary dark:bg-surface-dark">
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <div className="space-y-6">
                  {[1, 2].map((item) => (
                    <div key={item} className="flex gap-3">
                      <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
                      <div className="space-y-2 w-3/4">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-16 w-full rounded-md" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 pt-4">
                  <Skeleton className="h-12 flex-1 rounded-md" />
                  <Skeleton className="h-12 w-12 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticularComplaintSkeleton;
