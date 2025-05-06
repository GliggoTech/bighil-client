"use client";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function TopClientsChart({ topClients, totalClients }) {
  return (
    <div className="w-full rounded-2xl bg-white dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 shadow-md p-4">
      {/* Header Section: Total Clients + Export Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 sm:gap-0">
        <h2 className="text-xl font-medium text-start dark:text-white">
          Total Clients:{" "}
          <span className="text-black dark:text-indigo-400 text-2xl font-bold">
            {totalClients}
          </span>
        </h2>
        <div className="bg-white cursor-pointer">
          <Button className="w-full sm:w-auto bg-primary text-white font-light hover:bg-primary/50">
            Export As CSV
          </Button>
        </div>
      </div>

      {/* Chart Section */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={topClients}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#CBD5E1" />
          <XAxis
            dataKey="name"
            stroke="#FFFFFF"
            tick={{ fontSize: 12, fill: "#242e4c" }}
          />
          <YAxis
            allowDecimals={false}
            stroke="#FFFFFF"
            tick={{ fontSize: 12, fill: "#242e4c" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#FFFFFF",
              borderColor: "#ced4da",
              borderRadius: 10,
              fontSize: 14,
            }}
            labelStyle={{ color: "#242e4c", fontWeight: 600 }}
            itemStyle={{ color: "#242e4c" }}
          />
          <Legend wrapperStyle={{ fontSize: 14 }} />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#fd7e14"
            strokeWidth={1.5}
            activeDot={{ r: 6, strokeWidth: 3, stroke: "#ced4da" }}
            name="Complaints"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
