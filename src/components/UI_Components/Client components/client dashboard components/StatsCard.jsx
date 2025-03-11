import { colorSchemes } from "@/lib/dashboard constants/colorSchemes";
import { TrendIndicator } from "./Admin stats components/TrendIndicator";
import { StatValue } from "./Admin stats components/StatValue";
import { Card } from "@/components/ui/card";
import { StatHeader } from "./Admin stats components/StatHeader";
import { cn } from "@/lib/utils";

export const StatsCard = ({
  title,
  count,
  percentage,
  trend,
  icon,
  color,
  isNegative = false,
}) => {
  const colorScheme = colorSchemes[color];

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300 bg-white dark:bg-gray-900 hover:shadow-lg hover:translate-y-[-2px]",

        colorScheme.border
      )}
    >
      {/* Gradient overlay at top */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-1",
          colorScheme.gradient
        )}
      />

      {/* Content */}
      <div className="relative z-10">
        <StatHeader title={title} Icon={icon} color={color} />

        <div className="p-4">
          <TrendIndicator
            percentage={percentage}
            trend={trend}
            isNegativeMetric={isNegative}
          />

          <StatValue count={count} sparklineProps={{ trend, color }} />
        </div>
      </div>

      {/* Background gradient effect */}
      <div
        className={cn("absolute inset-0 opacity-[0.2]", colorScheme.gradient)}
      />
    </Card>
  );
};
