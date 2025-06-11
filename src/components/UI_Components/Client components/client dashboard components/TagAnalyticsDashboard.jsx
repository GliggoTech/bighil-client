"use client";

import { useIsMobile } from "@/custom hooks/useIsMobile";
import { COLORS } from "@/utils/chartColors";
import { createRenderActiveShape } from "@/utils/createRenderActiveShape";
import { useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";

export function TagAnalyticsDashboard({ tagData, totalComplaints }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();
  const renderShape = createRenderActiveShape(isMobile); // ✅ pass isMobile safely
  const coloredData = tagData?.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length],
  }));

  return (
    <div className="w-full h-[400px] bg-white shadow-md rounded-2xl">
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
    </div>
  );
}
