"use client";

import { Pie, PieChart, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

export function MaximumComplaintsAgainst({ data }) {
  if (!data || data.length === 0) return null;

  // Enhanced color palette using Tailwind config
  const COLORS = ["#2563EB", "#10B981", "#F59E0B", "#3B82F6", "#ef4444"];

  // Gradient definitions for enhanced visual appeal <sup data-citation="1" className="inline select-none [&>a]:rounded-2xl [&>a]:border [&>a]:px-1.5 [&>a]:py-0.5 [&>a]:transition-colors shadow [&>a]:bg-ds-bg-subtle [&>a]:text-xs [&>svg]:w-4 [&>svg]:h-4 relative -top-[2px] citation-shimmer"><a href="https://flowbite.com/docs/plugins/charts/">1</a></sup>
  const gradientIds = COLORS.map((_, i) => `pieGradient-${i}`);

  const chartData = data.map((item, index) => ({
    browser: item._id,
    visitors: item.count,
    percentage: item.percentage,
    fill: COLORS[index],
    gradientId: gradientIds[index],
  }));

  const chartConfig = {
    visitors: {
      label: "Complaints",
    },
    ...data.reduce(
      (config, item, index) => ({
        ...config,
        [item._id.toLowerCase()]: {
          label: item._id,
          color: COLORS[index],
        },
      }),
      {}
    ),
  };

  const renderCustomLabel = (props) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, value, index } = props;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor="middle"
        dominantBaseline="top"
        className="text-[14px] font-medium drop-shadow-md"
      >
        <tspan x={x} dy="-0.5em" className="font-semibold">
          {chartData[index].browser}
        </tspan>
        <tspan x={x} dy="1.2em" className="text-text-secondary">
          {value}
        </tspan>
        <tspan x={x} dy="1.2em" className="text-text-secondary">
          {`(${chartData[index].percentage}%)`}
        </tspan>
      </text>
    );
  };

  return (
    <Card
      className="flex flex-col bg-gradient-to-br from-background-primary/5  to-background-secondary/10 
                    backdrop-blur-md border-border-light/10 shadow-2xl rounded-2xl overflow-hidden
                    hover:shadow-primary/5 transition-all duration-300"
    >
      <CardHeader className="items-center">
        <CardTitle className="text-text-primary text-xl">
          Top Complained Person
        </CardTitle>
        <CardDescription className="text-text-secondary">
          Individual with the highest complaint count
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0 relative ">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px] [&_.recharts-text]:fill-text-light"
        >
          <PieChart>
            {/* Define gradients for enhanced visual appeal <sup data-citation="1" className="inline select-none [&>a]:rounded-2xl [&>a]:border [&>a]:px-1.5 [&>a]:py-0.5 [&>a]:transition-colors shadow [&>a]:bg-ds-bg-subtle [&>a]:text-xs [&>svg]:w-4 [&>svg]:h-4 relative -top-[2px] citation-shimmer"><a href="https://flowbite.com/docs/plugins/charts/">1</a></sup> */}
            <defs>
              {COLORS.map((color, index) => (
                <linearGradient
                  key={gradientIds[index]}
                  id={gradientIds[index]}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.6} />
                </linearGradient>
              ))}
            </defs>

            <ChartTooltip
              content={({ active, payload }) => {
                if (active && payload?.[0]) {
                  const item = payload[0].payload;
                  return (
                    <div
                      className="bg-surface-medium backdrop-blur-md px-4 py-3 
                                  rounded-lg shadow-xl border border-border-light/20
                                  transform transition-all duration-200 scale-100"
                    >
                      <p className="font-bold text-black text-lg">
                        {item.browser}
                      </p>
                      <div className="space-y-1 mt-2">
                        <p className="text-sm text-text-secondary flex items-center gap-2">
                          Complaints:
                          <span className="font-medium text-primary">
                            {item.visitors}
                          </span>
                        </p>
                        <p className="text-sm text-text-secondary flex items-center gap-2">
                          Percentage:
                          <span className="font-medium text-primary">
                            {item.percentage}%
                          </span>
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              innerRadius={60}
              outerRadius={150}
              paddingAngle={3}
              // label={renderCustomLabel}
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#${entry.gradientId})`}
                  stroke="hsl(var(--border-light) / 0.1)"
                  strokeWidth={1.5}
                  className="transition-all duration-300 hover:opacity-90 
                            cursor-pointer drop-shadow-md"
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
