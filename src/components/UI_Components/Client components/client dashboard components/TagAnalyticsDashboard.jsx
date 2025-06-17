"use client";

import { useIsMobile } from "@/custom hooks/useIsMobile";
import { COLORS } from "@/utils/chartColors";
import { createRenderActiveShape } from "@/utils/createRenderActiveShape";
import { useMemo, useState } from "react";
import { PieChart, Pie, ResponsiveContainer } from "recharts";
import { TagIcon } from "lucide-react";

export default function TagAnalyticsDashboard({ tagData = [] }) {

  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();
  const renderShape = createRenderActiveShape(isMobile);

  // Filter and colorize only valid entries
  const coloredData = useMemo(() => {
    if (!Array.isArray(tagData)) return [];

    return tagData
      .filter((item) => typeof item?.value === "number" && item.value > 0)
      .map((item, index) => ({
        ...item,
        fill: COLORS[index % COLORS.length],
      }));
  }, [tagData]);

  const hasData = coloredData.length > 0;

  return (
    <div className="w-full h-[400px] bg-white shadow-md rounded-2xl">
      {hasData ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderShape}
              data={coloredData}
              cx="47%"
              cy="50%"
              innerRadius={isMobile ? 45 : 100}
              outerRadius={isMobile ? 60 : 120}
              fill="#3134de"
              dataKey="value"
              onMouseEnter={(_, index) => setActiveIndex(index)}
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-full w-full flex flex-col items-center justify-center text-muted-foreground">
          <TagIcon className="w-6 h-6 mb-2 text-gray-400" />
          <p className="text-sm">No tag analytics data available</p>
        </div>
      )}
    </div>
  );
}
