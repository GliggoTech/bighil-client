import { TriangleAlert } from "lucide-react";
import React from "react";

const ErrorComponent = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[200px] space-y-4 
    bg-red-50/50 border border-red-100 rounded-xl p-6 backdrop-blur-sm
    dark:bg-red-900/10 dark:border-red-900/50"
    >
      <TriangleAlert className="h-12 w-12 text-red-500 dark:text-red/80" />
      <h1 className="text-red-700 font-medium dark:text-red-300">
        Failed to load dashboard data
      </h1>
      <p className="text-sm text-red-600/80 dark:text-red/60 text-center">
        Please refresh the page or try again later
      </p>
    </div>
  );
};

export default ErrorComponent;
