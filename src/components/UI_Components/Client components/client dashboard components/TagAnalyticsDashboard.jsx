"use client";

import { useState } from "react";
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
  Cell,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import config from "../../../../../tailwind.config.mjs";

// Professional color palette with good contrast <sup data-citation="1" className="inline select-none [&>a]:rounded-2xl [&>a]:border [&>a]:px-1.5 [&>a]:py-0.5 [&>a]:transition-colors shadow [&>a]:bg-ds-bg-subtle [&>a]:text-xs [&>svg]:w-4 [&>svg]:h-4 relative -top-[2px] citation-shimmer"><a href="https://js.devexpress.com/React/Documentation/Guide/UI_Components/PieChart/Series/Customize_Appearance/">1</a></sup>
const CHART_COLORS = [
  "hsl(280, 100%, 65%)", // Vibrant purple
  "hsl(190, 90%, 50%)", // Bright cyan
  "hsl(150, 80%, 45%)", // Emerald green
  "hsl(325, 85%, 60%)", // Pink
  "hsl(45, 95%, 60%)", // Golden yellow
];

export function TagAnalyticsDashboard({ tagData, totalComplaints }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  // Enhanced placeholder data with proper formatting <sup data-citation="2" className="inline select-none [&>a]:rounded-2xl [&>a]:border [&>a]:px-1.5 [&>a]:py-0.5 [&>a]:transition-colors shadow [&>a]:bg-ds-bg-subtle [&>a]:text-xs [&>svg]:w-4 [&>svg]:h-4 relative -top-[2px] citation-shimmer"><a href="https://mui.com/x/react-charts/pie/">2</a></sup>
  const placeholderData = [
    {
      name: tagData[0]?.name || "financial",
      value: tagData[0]?.count || 65,
      percentage: tagData[0]?.percentage || "5.00",
      fill: CHART_COLORS[0],
    },
    {
      name: tagData[1]?.name || "service",
      value: tagData[1]?.count || 35,
      percentage: tagData[1]?.percentage || "5.00",
      fill: CHART_COLORS[1],
    },
    {
      name: tagData[2]?.name || "delivery",
      value: tagData[2]?.count || 15,
      percentage: tagData[2]?.percentage || "5.00",
      fill: CHART_COLORS[2],
    },
    {
      name: tagData[3]?.name || "quality",
      value: tagData[3]?.value || 10,
      percentage: tagData[3]?.percentage || "5.00",
      fill: CHART_COLORS[3],
    },
    {
      name: tagData[4]?.name || "other",
      value: tagData[4]?.count || 5,
      percentage: tagData[4]?.percentage || "5.00",
      fill: CHART_COLORS[4],
    },
  ];

  const chartData = placeholderData;

  // Enhanced active shape with better visual effects <sup data-citation="3" className="inline select-none [&>a]:rounded-2xl [&>a]:border [&>a]:px-1.5 [&>a]:py-0.5 [&>a]:transition-colors shadow [&>a]:bg-ds-bg-subtle [&>a]:text-xs [&>svg]:w-4 [&>svg]:h-4 relative -top-[2px] citation-shimmer"><a href="https://js.devexpress.com/React/Demos/WidgetsGallery/Demo/Charts/Palette/">3</a></sup>
  const renderActiveShape = (props) => {
    const {
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
    } = props;

    return (
      <g>
        {/* Center text container with gradient background */}
        <circle
          cx={cx}
          cy={cy}
          r={innerRadius - 5}
          fill="rgba(255,255,255,0.05)"
        />

        {/* Category name */}
        <text
          x={cx}
          y={cy - 15}
          textAnchor="middle"
          fill="#000"
          className="text-sm font-medium capitalize"
        >
          {payload.name}
        </text>

        {/* Percentage with larger size */}
        <text
          x={cx}
          y={cy + 15}
          textAnchor="middle"
          fill="#000"
          className="text-2xl font-bold"
        >
          {`${payload.percentage}%`}
        </text>

        {/* Main sector with gradient */}
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 8}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          opacity={0.9}
        />

        {/* Outer glow effect */}
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 10}
          outerRadius={outerRadius + 12}
          fill={fill}
          opacity={0.3}
        />
      </g>
    );
  };

  // Enhanced tooltip with more visual appeal <sup data-citation="4" className="inline select-none [&>a]:rounded-2xl [&>a]:border [&>a]:px-1.5 [&>a]:py-0.5 [&>a]:transition-colors shadow [&>a]:bg-ds-bg-subtle [&>a]:text-xs [&>svg]:w-4 [&>svg]:h-4 relative -top-[2px] citation-shimmer"><a href="https://mui.com/x/react-charts/styling/">4</a></sup>
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.[0]) {
      return (
        <div
          className="bg-surface-medium backdrop-blur-sm border border-slate-700/50 
                      px-4 py-3 rounded-lg shadow-xl"
        >
          <p className="text-text_color font-semibold text-lg capitalize">
            {payload[0].name}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: payload[0].fill }}
            />
            <p className="text-primary">
              {`${payload[0].payload.percentage}% (${payload[0].value})`}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card
      className="flex flex-col bg-primary-light/10 
                     shadow-xl rounded-xl overflow-hidden"
    >
      <CardHeader
        className="items-center 
                           "
      >
        <CardTitle className="text-text_color text-xl font-semibold">
          Complaint Categories
        </CardTitle>
        <CardDescription className="text-text-secondary mb-2">
          Analysis of {totalComplaints || "..."} total complaints
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0 ">
        <div className="mx-auto aspect-square max-h-[350px] relative">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="h-8 w-8 rounded-full border-2 border-primary/30 
                            border-t-primary animate-spin"
              />
            </div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    dataKey="value"
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                    onClick={(_, index) => setActiveIndex(index)}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.fill}
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth={1}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} cursor={false} />
                </PieChart>
              </ResponsiveContainer>

              {/* Enhanced legend with hover effects */}
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                {chartData.map((entry, index) => (
                  <div
                    key={`legend-${index}`}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg
                             transition-all duration-200 cursor-pointer
                             hover:bg-slate-800/50"
                    onClick={() => setActiveIndex(index)}
                  >
                    <div
                      className={`h-3 w-3 rounded-full transition-transform duration-200
                                ${
                                  activeIndex === index
                                    ? "scale-125"
                                    : "scale-100"
                                }`}
                      style={{ backgroundColor: entry.fill }}
                    />
                    <span
                      className={`text-sm text-wrap transition-colors duration-200
                                ${
                                  activeIndex === index
                                    ? "text-text_color font-medium"
                                    : "text-text_color"
                                }`}
                    >
                      {entry.name} ({entry.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
