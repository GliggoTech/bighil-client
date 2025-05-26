"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function MyAccountSkeleton() {
  return (
    <div className="min-h-screen bg-bighil_dashboard_bg dark:from-texttext-text_color dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-4">
          <Skeleton className="h-6 w-48 mx-auto mb-2" />
          <Skeleton className="h-4 w-64 mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card Skeleton */}
          <Card className="lg:col-span-1 shadow-md border bg-white border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-4">
              <Skeleton className="h-6 w-40 mx-auto mb-2" />
              <Skeleton className="h-4 w-36 mx-auto" />
            </CardHeader>
            <CardContent className="space-y-6">
              <Skeleton className="w-24 h-24 mx-auto rounded-full" />

              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Password Form Skeleton */}
          <Card className="lg:col-span-2 shadow-md border bg-white border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-4">
              <Skeleton className="h-6 w-40 mb-2" />
              <Skeleton className="h-4 w-60" />
            </CardHeader>
            <CardContent className="space-y-6">
              {[1, 2].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-12 w-full rounded-md" />
                </div>
              ))}

              <Skeleton className="h-12 w-full rounded-lg" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
