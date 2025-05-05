// components/SignupChart.jsx
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";

// const last7DaysSignups = [
//   { Day: "Sun", Count: 10 },
//   { Day: "Mon", Count: 8 },
//   { Day: "Tue", Count: 0 },
//   { Day: "Wed", Count: 15 },
//   { Day: "Thu", Count: 4 },
//   { Day: "Fri", Count: 0 },
//   { Day: "Sat", Count: 0 },
// ];

export default function SignupChart({ last7DaysSignups }) {
  return (
    <Card className="rounded-2xl shadow-lg p-2 w-full max-w-6xl mx-auto bg-white dark:bg-zinc-900">
      <CardContent>
        <h2 className="text-xl font-semibold text-center mb-4 text-zinc-800 dark:text-white">
          Last 7 Days Signups
        </h2>
        <ResponsiveContainer width="100%" height={195}>
          <BarChart
            data={last7DaysSignups}
            margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="Day" stroke="#8884d8" />
            <YAxis allowDecimals={false} stroke="#8884d8" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                borderRadius: "0.5rem",
                color: "white",
              }}
              itemStyle={{ color: "white" }}
              cursor={{ fill: "#e0e7ff" }}
            />
            <Bar
              dataKey="Count"
              fill="url(#colorSignup)"
              radius={[8, 8, 0, 0]}
              barSize={40}
            />
            <defs>
              <linearGradient id="colorSignup" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366F1" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.7} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
