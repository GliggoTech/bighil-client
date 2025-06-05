import { TrendingUp } from "lucide-react";
import React from "react";

const MonthlyTrendHeader = () => {
  return (
    <div className="bg-primary text-white p-6 rounded-lg mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Monthly Trends Dashboard
          </h1>
          <p className="text-white text-sm md:text-base">
            Track complaint resolution trends and performance metrics over time.
            Monitor pending, in-progress, and resolved complaints to identify
            patterns and improve service delivery.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <TrendingUp className="h-8 w-8 mx-auto mb-2" />
            <p className="text-xs text-center">Analytics</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyTrendHeader;
