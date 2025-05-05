"use client";
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
    <div className="w-full rounded-2xl bg-gradient-to-br from-slate-100 via-indigo-50 to-purple-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 shadow-md p-4">
      <h2 className="text-xl font-bold text-center text-slate-800 dark:text-white mb-4">
        Total Clients:{" "}
        <span className="text-black dark:text-indigo-400 text-2xl font-bold">
          {totalClients}
        </span>
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={topClients}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#CBD5E1" />
          <XAxis
            dataKey="name"
            stroke="#94A3B8"
            tick={{ fontSize: 12, fill: "#64748B" }}
          />
          <YAxis
            allowDecimals={false}
            stroke="#94A3B8"
            tick={{ fontSize: 12, fill: "#64748B" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#EEF2FF", // light indigo
              borderColor: "#C7D2FE",
              borderRadius: 10,
              fontSize: 14,
            }}
            labelStyle={{ color: "#4F46E5", fontWeight: 600 }}
            itemStyle={{ color: "#7C3AED" }}
          />
          <Legend wrapperStyle={{ fontSize: 14 }} />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#7C3AED" // violet-600
            strokeWidth={1.5}
            activeDot={{ r: 6, strokeWidth: 3, stroke: "#4F46E5" }} // indigo ring
            name="Client Complaints"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
