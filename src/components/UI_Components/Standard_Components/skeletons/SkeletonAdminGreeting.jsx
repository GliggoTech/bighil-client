import React from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonAdminGreeting() {
  return (
    <Card className="p-4 shadow-sm border-0">
      <div className="flex items-center justify-between">
        {/* Left side: Greeting and description */}
        <div className="space-y-2">
          {/* Simulated greeting text (e.g., "Hello, Admin") */}
          <Skeleton className="h-6 w-40" />
          {/* Simulated description */}
          <Skeleton className="h-4 w-60" />
        </div>
        {/* Right side: Placeholder for the current time (wall clock) */}
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
    </Card>
  );
}
