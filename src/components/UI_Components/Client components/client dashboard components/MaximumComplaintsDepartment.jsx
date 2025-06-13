"use client";

import { useIsMobile } from "@/custom hooks/useIsMobile";
import { COLORS } from "@/utils/chartColors";
import { createRenderActiveShape } from "@/utils/createRenderActiveShape";
import { BellIcon } from "lucide-react";
import { useState, useMemo } from "react";
import { PieChart, Pie, ResponsiveContainer } from "recharts";

export function MaximumComplaintsDepartment({ data = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();

  // Validate and sanitize data
  const coloredData = useMemo(() => {
    if (!Array.isArray(data)) return [];

    return data
      .filter((item) => typeof item?.value === "number" && item.value > 0)
      .map((item, index) => ({
        ...item,
        fill: COLORS[index % COLORS.length],
      }));
  }, [data]);

  const renderShape = createRenderActiveShape(isMobile);
  const hasData = coloredData.length > 0;

  return (
    <div className="w-full max-w-full h-[300px] md:h-[400px] bg-white shadow-md rounded-2xl overflow-hidden">
      {hasData ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderShape}
              data={coloredData}
              cx="50%"
              cy="50%"
              innerRadius={isMobile ? 45 : 100}
              outerRadius={isMobile ? 60 : 120}
              fill="#3134de"
              dataKey="value"
              fontSize={isMobile ? 14 : 16}
              onMouseEnter={(_, index) => setActiveIndex(index)}
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="py-8 h-full flex flex-col items-center justify-center text-muted-foreground">
          <BellIcon className="w-6 h-6 mb-2 text-gray-400" />
          <p className="text-sm">No department complaints data available</p>
        </div>
      )}
    </div>
  );
}
