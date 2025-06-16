"use client";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-800">{data.tag}</p>
        <p className="text-sm text-gray-600">
          Count: <span className="font-medium">{data.count}</span>
        </p>
        <p className="text-sm text-gray-600">
          Percentage: <span className="font-medium">{data.percentage}%</span>
        </p>
      </div>
    );
  }
  return null;
};

const CustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return percent > 0.05 ? (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-xs font-semibold"
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  ) : null;
};

// 🔑 Generate key insights dynamically
const getDynamicInsights = (tags) => {
  if (!Array.isArray(tags) || tags.length === 0) return [];

  const sortedTags = [...tags].sort((a, b) => b.percentage - a.percentage);
  const top1 = sortedTags[0];
  const top2 = sortedTags[1];

  const financialTags = [
    "Financial Loss",
    "Unauthorized Charges",
    "Fraudulent Transaction",
  ];
  const financialPercentage = tags
    .filter((tag) => financialTags.includes(tag.tag))
    .reduce((acc, cur) => acc + cur.percentage, 0);

  const insights = [];
  if (top1) {
    insights.push(
      `• ${top1.tag} accounts for ${top1.percentage}% of all complaints`
    );
  }
  if (top2) {
    insights.push(
      `• ${top2.tag} is the second most common issue at ${top2.percentage}%`
    );
  }
  if (financialPercentage > 0) {
    insights.push(
      `• Financial-related complaints make up ${financialPercentage.toFixed(
        1
      )}% combined`
    );
  }

  return insights;
};

const CategoryBreakDownChart = ({ data }) => {
  const tags = Array.isArray(data?.tags) ? data.tags : [];
  const insights = getDynamicInsights(tags);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Distribution by Category
        </h2>
        <p className="text-gray-600 text-sm">
          Visual representation of complaint categories and their relative
          frequencies
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2">
          {tags.length === 0 ? (
            <div className="col-span-3 text-center p-6 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No data available.</p>
            </div>
          ) : (
            <div className="h-80 lg:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={tags}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={CustomLabel}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="count"
                    animationBegin={0}
                    animationDuration={800}
                  >
                    {tags.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Legend and Details Section */}
        {tags.length > 0 && (
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Category Details
            </h3>
            <div className="space-y-3">
              {tags.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div
                    className="w-4 h-4 rounded-full mt-1 flex-shrink-0"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-800 truncate">
                      {item.tag}
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-600">
                        {item.count} complaints
                      </span>
                      <span className="text-xs font-semibold text-gray-800">
                        {item.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                      <div
                        className="h-1.5 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: colors[index % colors.length],
                          width: `${item.percentage}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dynamic Insights */}
            {insights.length > 0 && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="text-sm font-semibold text-blue-800 mb-2">
                  Key Insights
                </h4>
                <ul className="text-xs text-blue-700 space-y-1">
                  {insights.map((insight, idx) => (
                    <li key={idx}>{insight}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryBreakDownChart;
