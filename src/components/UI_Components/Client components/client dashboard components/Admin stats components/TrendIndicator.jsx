import { getTrendColor } from "@/utils/statsHelpers";
import { ArrowDown, ArrowUp } from "lucide-react";

export const TrendIndicator = ({ percentage, trend, isNegativeMetric }) => {
  return (
    <div className={getTrendColor(isNegativeMetric, percentage)}>
      {trend === "up" ? (
        <ArrowUp className="h-3 w-3 mr-1" />
      ) : (
        <ArrowDown className="h-3 w-3 mr-1" />
      )}
      <span>{Math.abs(percentage).toFixed(1)}%</span>
    </div>
  );
};
