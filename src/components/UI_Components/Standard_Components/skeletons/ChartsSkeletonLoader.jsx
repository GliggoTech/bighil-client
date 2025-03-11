import { Skeleton } from "@/components/ui/skeleton";

export function ChartsSkeletonLoader() {
  return (
    <div className="grid grid-cols-1  gap-6">
      {/* Keywords Chart Skeleton */}
      <div
        className="flex flex-col h-full items-center justify-center bg-gradient-to-br from-primary/60 to-background-secondary/90 
                      rounded-2xl shadow-lg border border-border-light/20 
                      dark:border-border-dark/20 p-6 backdrop-blur-lg"
      >
        <div className="space-y-4">
          {/* Header Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-7 w-[200px] bg-border-light/10 dark:bg-border-dark/10" />
            <Skeleton className="h-4 w-[300px] bg-border-light/10 dark:bg-border-dark/10" />
          </div>

          {/* Chart Skeleton */}
          <div className="flex items-center justify-center h-[350px]">
            <div className="space-y-4 w-full">
              {/* Circular skeleton for pie chart */}
              <div className="relative mx-auto">
                <Skeleton className="h-[300px] w-[300px] rounded-full bg-border-light/10 dark:bg-border-dark/10" />
                {/* Inner circle for donut effect */}
                {/* <Skeleton className="h-[150px] w-[150px] rounded-full bg-primary/50 dark:bg-background-dark/90 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" /> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Complaints Skeleton */}
      {/* <div
        className="flex flex-col h-full bg-gradient-to-br from-background-primary/90 to-background-secondary/90 
                      rounded-2xl shadow-lg border border-border-light/20 
                      dark:border-border-dark/20 p-6 backdrop-blur-lg"
      >
        <div
          className="flex-1 rounded-2xl bg-gradient-to-br from-accent-success/5 to-accent-info/5 
                        dark:from-accent-success/10 dark:to-accent-info/10 h-full"
        >
          <div className="space-y-6">
      
            <div className="space-y-2">
              <Skeleton className="h-7 w-[200px] bg-border-light/10 dark:bg-border-dark/10" />
              <Skeleton className="h-4 w-[300px] bg-border-light/10 dark:bg-border-dark/10" />
            </div>

       
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="space-y-2">
                  <Skeleton className="h-20 rounded-xl bg-border-light/10 dark:bg-border-dark/10" />
                </div>
              ))}
            </div>

          
            <div className="mt-6">
              <Skeleton className="h-[200px] w-full rounded-xl bg-border-light/10 dark:bg-border-dark/10" />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
