import { TriangleAlert } from "lucide-react";
import React from "react";

const ErrorComponent = ({ message = "Something went wrong" }) => {
  return (
    <div
      className="flex flex-col max-w-md mx-auto items-center justify-center min-h-[200px] space-y-4 
    bg-white border border-red rounded-xl p-6 mt-6 backdrop-blur-sm
    dark:bg-red dark:border-white"
    >
      <TriangleAlert className="h-12 w-12 text-red dark:text-red/80" />
      <h1 className="text-red font-medium dark:text-red-300">{message}</h1>
      <p className="text-sm text-red dark:text-red/60 text-center">
        Please refresh the page or try again later
      </p>
    </div>
  );
};

export default ErrorComponent;
