import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ComplaintsTableSkeleton() {
  return (
    <Card className="shadow-md border-none p-6">
      <CardHeader className="bg-default_bg border-b border-light dark:border-border-dark">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32 border-none" />
          <Skeleton className="h-8 w-20 border-none" />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {Array(5)
          .fill(null)
          .map((_, i) => (
            <div key={i} className="flex items-center space-x-4 py-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px] border-none" />
                <Skeleton className="h-4 w-[150px] border-none" />
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  );
}
