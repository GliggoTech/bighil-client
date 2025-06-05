"use client";
import { AlertCircle, CheckCircle, Clock, TrendingUp } from "lucide-react";
import React from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const BarAndLineChart = ({ data }) => {
  const chartData = data.map((item) => ({
    month: item.month.split(" ")[0], // Extract month name
    totalComplaint: item.totalComplaint,
    pendingCount: item.pendingCount,
    inProgressCount: item.inProgressCount,
    unwantedCount: item.unwantedCount,
    resolvedCount: item.resolvedCount,
    resolvedPercentage: item.resolvedPercentage.toFixed(0),
  }));
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Complaints</p>
              <p className="text-2xl font-bold text-gray-900">
                {data.reduce((sum, item) => sum + item.totalComplaint, 0)}
              </p>
            </div>
            <AlertCircle className="h-8 w-8 text-blue" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow">
                {data.reduce((sum, item) => sum + item.pendingCount, 0)}
              </p>
            </div>
            <Clock className="h-8 w-8 text-yellow" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-orange">
                {data.reduce((sum, item) => sum + item.inProgressCount, 0)}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-green">
                {data.reduce((sum, item) => sum + item.resolvedCount, 0)}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green" />
          </div>
        </div>
      </div>

      {/* Combined Chart */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">
          Complaint Trends - Counts vs Resolution Rate
        </h3>
        <div className="w-full h-80 md:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis
                yAxisId="counts"
                tick={{ fontSize: 12 }}
                label={{ value: "Count", angle: -90, position: "insideLeft" }}
              />
              <YAxis
                yAxisId="percentage"
                orientation="right"
                tick={{ fontSize: 12 }}
                label={{
                  value: "Resolution %",
                  angle: 90,
                  position: "insideRight",
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Legend />

              <Bar
                yAxisId="counts"
                dataKey="totalComplaint"
                fill="#3b82f6"
                name="Total Complaints"
              />
              <Bar
                yAxisId="counts"
                dataKey="pendingCount"
                fill="#eab308"
                name="Pending"
              />
              <Bar
                yAxisId="counts"
                dataKey="inProgressCount"
                fill="#f97316"
                name="In Progress"
              />
              <Bar
                yAxisId="counts"
                dataKey="resolvedCount"
                fill="#22c55e"
                name="Resolved"
              />

              <Line
                yAxisId="percentage"
                type="monotone"
                dataKey="resolvedPercentage"
                stroke="#dc2626"
                strokeWidth={1}
                dot={{ fill: "#dc2626", r: 6 }}
                name="Resolution Rate (%)"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BarAndLineChart;
