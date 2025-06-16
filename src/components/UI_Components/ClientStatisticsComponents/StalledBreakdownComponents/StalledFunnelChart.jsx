"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FunnelChart,
  Funnel,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

const StalledFunnelChart = ({ data, summary }) => {


  // Guard clause for null or malformed input
  const isDataInvalid =
    !data ||
    typeof data !== "object" ||
    !summary ||
    typeof summary !== "object";

  if (isDataInvalid) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Stalled Complaints Breakdown</CardTitle>
          <CardDescription>Invalid or missing data.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-gray-500">
            No chart data available.
          </div>
        </CardContent>
      </Card>
    );
  }

  const {
    pending = {},
    pendingAuthorization = {},
    inProgressButStalled = {},
  } = data;

  const {
    totalActive = 0,
    totalStalled = 0,
    stalledPercentageOfTotal = 0,
    changeFromPrevious = 0,
  } = summary;

  const funnelData = [
    {
      name: "Total Active",
      value: totalActive,
      fill: "#3B82F6",
      description: "All active complaints",
      change: 0,
    },
    {
      name: "Stalled",
      value: totalStalled,
      fill: "#EF4444",
      description: `${stalledPercentageOfTotal}% of active complaints`,
      change: changeFromPrevious,
    },
    {
      name: "Pending",
      value: pending.count || 0,
      fill: "#F59E0B",
      description: pending.description || "Pending complaints",
      change: pending.change || 0,
    },
    {
      name: "Pending Auth",
      value: pendingAuthorization.count || 0,
      fill: "#EF4444",
      description:
        pendingAuthorization.description ||
        "Complaints waiting for authorization",
      change: pendingAuthorization.change || 0,
    },
    {
      name: "In Progress Stalled",
      value: inProgressButStalled.count || 0,
      fill: "#7C3AED",
      description:
        inProgressButStalled.description ||
        "In-progress complaints with issues",
      change: inProgressButStalled.change || 0,
    },
  ]
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg max-w-xs">
          <p className="font-semibold">{data.name}</p>
          <p className="text-blue">{data.value} complaints</p>
          <p className="text-sm text-gray-600">{data.description}</p>
          {data.change !== 0 && (
            <div className="flex items-center gap-1 mt-1">
              {data.change > 0 ? (
                <TrendingUp className="h-3 w-3 text-red" />
              ) : (
                <TrendingDown className="h-3 w-3 text-green" />
              )}
              <span
                className={`text-xs ${
                  data.change > 0 ? "text-red" : "text-green"
                }`}
              >
                {data.change > 0 ? "+" : ""}
                {data.change.toFixed(1)}%
              </span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ x, y, width, height, value, name }) => {
    return (
      <text
        x={x + width / 1.05}
        y={y + height / 1.5}
        textAnchor="right"
        dominantBaseline="middle"
        fontSize="12"
        fill="black"
        fontWeight="bold"
      >
        {value > 0 ? `${name}: ${value}` : ""}
      </text>
    );
  };

  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Stalled Complaints Funnel
          {changeFromPrevious > 0 && (
            <TrendingUp className="h-4 w-4 text-red-500" />
          )}
          {changeFromPrevious < 0 && (
            <TrendingDown className="h-4 w-4 text-green-500" />
          )}
        </CardTitle>
        <CardDescription>
          Breakdown of complaint stages and stalling patterns
        </CardDescription>
      </CardHeader>
      <CardContent>
        {funnelData.length === 0 ? (
          <div className="h-64 flex items-center justify-center text-gray-500">
            No stalled complaints data available.
          </div>
        ) : (
          <>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <FunnelChart
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <Tooltip content={<CustomTooltip />} />
                  <Funnel dataKey="value" data={funnelData} isAnimationActive>
                    <LabelList content={<CustomLabel />} />
                    {funnelData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.fill}
                        stroke="#ffffff"
                        strokeWidth={2}
                      />
                    ))}
                  </Funnel>
                </FunnelChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="mt-4 space-y-2">
              <h4 className="font-semibold text-sm text-gray-700">Legend:</h4>
              <div className="grid grid-cols-1 gap-2">
                {funnelData.slice(1).map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.fill }}
                    ></div>
                    <span className="font-medium">{item.name}:</span>
                    <span>{item.value} complaints</span>
                    {totalStalled > 0 && (
                      <span className="text-gray-500">
                        ({((item.value / totalStalled) * 100).toFixed(1)}%)
                      </span>
                    )}
                    {item.change !== 0 && (
                      <span
                        className={`text-xs ${
                          item.change > 0 ? "text-red" : "text-green"
                        }`}
                      >
                        ({item.change > 0 ? "+" : ""}
                        {item.change.toFixed(1)}%)
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Key Insights */}
            <div className="mt-4 p-3 bg-primary/10 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Key Insights:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>
                  • {stalledPercentageOfTotal}% of active complaints are stalled
                </li>
                {totalStalled > 0 && (
                  <li>
                    • Most stalled complaints are in:{" "}
                    {Object.entries(data)
                      .sort(
                        ([, a], [, b]) => (b?.count || 0) - (a?.count || 0)
                      )[0][0]
                      .replace(/([A-Z])/g, " $1")
                      .trim()}{" "}
                    status
                  </li>
                )}
                <li>
                  • {changeFromPrevious > 0 ? "Increase" : "Decrease"} of{" "}
                  {Math.abs(changeFromPrevious).toFixed(1)}% from previous
                  period
                </li>
              </ul>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default StalledFunnelChart;
