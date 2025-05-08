import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-primary/10 border-none",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
