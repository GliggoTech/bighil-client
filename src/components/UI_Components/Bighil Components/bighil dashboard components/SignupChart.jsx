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
import { Users } from "lucide-react";

export default function SignupChart({
  last7DaysSignups,
  totalUsers,
  todayActiveUsers,
}) {
  return (
    <div className="rounded-2xl shadow-lg  p-3 w-full mx-auto bg-white dark:bg-zinc-900">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 justify-items-center ">
        {/* Total Users */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
          <h1 className="text-sm sm:text-base md:text-lg font-medium  flex items-center gap-1">
            <div className="bg-blue/50 p-2 rounded-full">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue" />
            </div>
            <span className="text-base">Total Users</span>
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-black">
            {totalUsers}
          </p>
        </div>

        {/* Today's Active Users */}
        <div className="flex flex-col sm:flex-row items-start md:justify-end sm:items-end gap-2 sm:gap-3">
          <h1 className="text-sm sm:text-base md:text-lg font-medium  flex items-center gap-1">
            <div className="bg-green/50 p-2 rounded-full">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-green" />
            </div>
            <span className="text-base">Live Users</span>
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-black">
            {todayActiveUsers}
          </p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={last7DaysSignups}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
          <XAxis dataKey="Day" stroke="#8884d8" />
          <YAxis allowDecimals={false} stroke="#8884d8" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#FFFFFF",
              borderColor: "#ced4da",
              borderRadius: 10,
              fontSize: 14,
            }}
            labelStyle={{ color: "#242e4c", fontWeight: 600 }}
            cursor={{ fill: "#e0e7ff" }}
          />
          <Bar
            dataKey="Count"
            fill="url(#colorSignup)"
            radius={[8, 8, 0, 0]}
            barSize={30}
          />
          <defs>
            <linearGradient id="colorSignup" x1="0" y1="0" x2="0" y2="10">
              <stop offset="0%" stopColor="#6366F1" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.7} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
