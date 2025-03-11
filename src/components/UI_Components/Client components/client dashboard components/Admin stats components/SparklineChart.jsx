import { colorSchemes } from "@/lib/dashboard constants/colorSchemes";
import { SPARKLINE_DIMENSIONS } from "@/lib/dashboard constants/dashboard";
import { generateSparklinePath } from "@/utils/statsHelpers";

export const SparklineChart = ({ trend, color }) => {
  const { height, width } = SPARKLINE_DIMENSIONS;
  const path = generateSparklinePath(trend, width, height);
  const fillColor = trend == "up" ? "#27CF73" : "#FF0000";

  return (
    <div className="relative h-[32px] w-[60px]">
      <svg
        className="absolute inset-0"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      >
        <defs>
          <linearGradient
            id={`gradient-${color}`}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" fill={fillColor} stopOpacity="100%" />
            <stop offset="100%" fill={fillColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={path}
          stroke={fillColor} // Use fillColor for the stroke as well
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={`${path} L${width},${height} L0,${height} Z`}
          fill={fillColor}
          className="opacity-50"
        />
      </svg>
    </div>
  );
};
