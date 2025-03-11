// src/utils/statsHelpers.js
export const getTrendColor = (isNegative, percentage) => {
  const baseClasses =
    "flex items-center px-2 py-1 rounded-full text-xs font-medium";

  if (isNegative) {
    return percentage >= 0
      ? `${baseClasses} bg-red-100 text-red-600 dark:bg-red-900/60 dark:text-red-400`
      : `${baseClasses} bg-green-100 text-green-600 dark:bg-green-900/60 dark:text-green-400`;
  }

  return percentage >= 0
    ? `${baseClasses} bg-green-100 text-green-600 dark:bg-green-900/60 dark:text-green-400`
    : `${baseClasses} bg-red-100 text-red-600 dark:bg-red-900/60 dark:text-red-400`;
};

export const generateSparklinePath = (trend, width, height) => {
  // Define control points for the path
  const points =
    trend === "up"
      ? [
          // Upward trend points
          { x: 0, y: height * 0.8 }, // Start point
          { x: width * 0.2, y: height * 0.6 }, // First control point
          { x: width * 0.4, y: height * 0.65 }, // Slight dip
          { x: width * 0.6, y: height * 0.4 }, // Rising
          { x: width * 0.8, y: height * 0.35 }, // Continue rising
          { x: width, y: height * 0.2 }, // End point (high)
        ]
      : [
          // Downward trend points
          { x: 0, y: height * 0.2 }, // Start point
          { x: width * 0.2, y: height * 0.35 }, // First control point
          { x: width * 0.4, y: height * 0.3 }, // Slight rise
          { x: width * 0.6, y: height * 0.6 }, // Dropping
          { x: width * 0.8, y: height * 0.65 }, // Continue dropping
          { x: width, y: height * 0.8 }, // End point (low)
        ];

  // Generate smooth curve using cubic bezier
  const path = points.reduce((acc, point, index) => {
    if (index === 0) {
      // Move to first point
      return `M ${point.x},${point.y}`;
    }

    if (index === points.length - 1) {
      // Draw line to last point
      return `${acc} L ${point.x},${point.y}`;
    }

    // Calculate control points for smooth curve
    const prevPoint = points[index - 1];
    const nextPoint = points[index + 1];

    // Control point calculations
    const cp1x = prevPoint.x + (point.x - prevPoint.x) * 0.5;
    const cp1y = prevPoint.y;
    const cp2x = point.x + (nextPoint.x - point.x) * 0.5;
    const cp2y = point.y;

    // Add cubic bezier curve
    return `${acc} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${point.x},${point.y}`;
  }, "");

  return path;
};

// Optional: Add variation functions for different patterns
export const generateSparklineVariations = {
  // Smooth curve with less control points
  simple: (trend, width, height) => {
    const points =
      trend === "up"
        ? [
            { x: 0, y: height * 0.7 },
            { x: width * 0.5, y: height * 0.5 },
            { x: width, y: height * 0.3 },
          ]
        : [
            { x: 0, y: height * 0.3 },
            { x: width * 0.5, y: height * 0.5 },
            { x: width, y: height * 0.7 },
          ];

    return `M ${points[0].x},${points[0].y} 
              Q ${points[1].x},${points[1].y} 
                ${points[2].x},${points[2].y}`;
  },

  // More dramatic curve with volatility
  volatile: (trend, width, height) => {
    const points =
      trend === "up"
        ? [
            { x: 0, y: height * 0.8 },
            { x: width * 0.2, y: height * 0.6 },
            { x: width * 0.4, y: height * 0.7 },
            { x: width * 0.6, y: height * 0.3 },
            { x: width * 0.8, y: height * 0.4 },
            { x: width, y: height * 0.2 },
          ]
        : [
            { x: 0, y: height * 0.2 },
            { x: width * 0.2, y: height * 0.4 },
            { x: width * 0.4, y: height * 0.3 },
            { x: width * 0.6, y: height * 0.7 },
            { x: width * 0.8, y: height * 0.6 },
            { x: width, y: height * 0.8 },
          ];

    return points.reduce((acc, point, index) => {
      if (index === 0) return `M ${point.x},${point.y}`;
      return `${acc} L ${point.x},${point.y}`;
    }, "");
  },

  // Stepped pattern
  stepped: (trend, width, height) => {
    const steps = 5;
    const stepWidth = width / steps;
    let path = "";

    for (let i = 0; i <= steps; i++) {
      const x = i * stepWidth;
      const y =
        trend === "up" ? height * (0.8 - i * 0.1) : height * (0.2 + i * 0.1);

      if (i === 0) {
        path = `M ${x},${y}`;
      } else {
        path += ` H ${x} V ${y}`;
      }
    }

    return path;
  },
};

// Usage example:
// const path = generateSparklinePath(trend, width, height);
// Or for variations:
// const path = generateSparklineVariations.volatile(trend, width, height);
