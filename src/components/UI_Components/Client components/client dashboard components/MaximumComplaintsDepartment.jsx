"use client";

import { useIsMobile } from "@/custom hooks/useIsMobile";
import { COLORS } from "@/utils/chartColors";
import { createRenderActiveShape } from "@/utils/createRenderActiveShape";
import { useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";

export function MaximumComplaintsDepartment({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const coloredData = data.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length],
  }));
  const isMobile = useIsMobile();
  const renderShape = createRenderActiveShape(isMobile); // ✅ pass isMobile safely

  return (
    <div className="w-full max-w-full h-[300px] md:h-[400px] bg-white shadow-md rounded-2xl overflow-hidden">
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
    </div>
  );
}
