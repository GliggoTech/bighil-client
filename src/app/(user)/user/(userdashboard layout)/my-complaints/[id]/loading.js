import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-1/3" />
      </div>

      {/* Status and Priority Tags */}
      <div className="flex gap-4">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      {/* Timeline Section */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-1/2" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>

      {/* Evidence Section */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-1/3" />
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="aspect-square w-full" />
          <Skeleton className="aspect-square w-full" />
          <Skeleton className="aspect-square w-full" />
        </div>
      </div>

      {/* Chat Interface Placeholder */}
      <div className="space-y-2 mt-6">
        <Skeleton className="h-5 w-1/3" />
        <div className="h-64 border rounded-xl p-4 space-y-2">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-5 w-1/4" />
        </div>
      </div>
    </div>
  );
}
