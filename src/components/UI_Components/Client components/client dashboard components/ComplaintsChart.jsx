"use client";

import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/custom hooks/useFetch";
import { getBackendUrl } from "@/lib/getBackendUrl";
import useAccessToken from "@/custom hooks/useAccessToken";

export default function ComplaintsChart() {
  const [data, setData] = useState([]);
  const { token } = useAccessToken();
  const [timeRange, setTimeRange] = useState("7");
  const { loading, success, error, fetchData } = useFetch();

  const fetchChartData = async (days) => {
    if (token != null) {
      const url = getBackendUrl();

      const res = await fetchData(
        `${url}/api/client-dashboard/complaints-timeline?timeframe=${days}`,
        "GET",
        {},
        token,
        false
      );

      if (res?.success) {
        setData(res?.data?.timeline);
      }
    }
  };

  useEffect(() => {
    fetchChartData(timeRange);
  }, [timeRange, token]);

  const handleTimeRangeChange = (value) => {
    setTimeRange(value);
  };

  // Format dates for display

  // Calculate summary statistics
  const calculateSummary = () => {
    if (!data.length) return { total: 0, dailyAvg: 0 };

    const totalComplaints = data.reduce(
      (sum, day) => sum + day.totalComplaints,
      0
    );
    const dailyAvg = totalComplaints / data.length;

    return {
      total: totalComplaints,
      dailyAvg: Math.round(dailyAvg * 10) / 10,
    };
  };

  const summary = calculateSummary();

  return (
    <Card className="w-full border-none bg-white">
      <CardHeader className="flex items-center gap-2 space-y-0   sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle className="text-lg font-bold text-text_color dark:text-text-light">
            Complaints Timeline
          </CardTitle>
          <CardDescription className="text-text_color">
            Showing complaint activity for the selected time period
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={handleTimeRangeChange}>
          <SelectTrigger
            className="w-[150px] border-light-border-subtle bg-primary-bg-subtle hover:bg-primary-bg-subtle-hover"
            aria-label="Select time range"
          >
            <SelectValue placeholder="Last 7 days" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-dialog_inside_border_color bg-white">
            <SelectItem value="7" className="rounded-lg">
              Last 7 days
            </SelectItem>
            <SelectItem value="30" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="90" className="rounded-lg">
              Last 90 days
            </SelectItem>
            <SelectItem value="365" className="rounded-lg">
              Last 1 year
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2  sm:px-6 ">
        {loading ? (
          <div className="flex h-[250px] w-full items-center justify-center">
            <p className="text-muted-foreground">Loading data...</p>
          </div>
        ) : error ? (
          <div className="flex h-[250px] w-full items-center justify-center">
            <p className="text-destructive">Error: {error}</p>
          </div>
        ) : (
          <>
            <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {/* Summary Cards */}
              <div className="rounded-lg shadow-md bg-light dark:bg-dark p-3">
                <p className="text-sm text-text-secondary dark:text-text-muted">
                  Total Complaints
                </p>
                <p className="text-2xl font-bold text-text_color dark:text-text-light">
                  {summary.total}
                </p>
              </div>

              <div className="rounded-lg shadow-md  bg-light dark:bg-dark p-3">
                <p className="text-sm text-text-secondary dark:text-text-muted">
                  Daily Average
                </p>
                <p className="text-2xl font-bold text-text_color dark:text-text-light">
                  {summary.dailyAvg}
                </p>
              </div>

              <div className="rounded-lg shadow-md  bg-light dark:bg-dark p-3">
                <p className="text-sm text-text-secondary dark:text-text-muted">
                  Period
                </p>
                <p className="text-2xl font-bold text-text_color dark:text-text-light">
                  {timeRange} days
                </p>
              </div>

              <div className="rounded-lg shadow-md  bg-light dark:bg-dark p-3">
                <p className="text-sm text-text-secondary dark:text-text-muted">
                  Last Updated
                </p>
                <p className="text-lg font-medium text-text_color dark:text-text-light">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)",
                  backgroundColor: "#fff",
                  padding: "0.5rem",
                }}
              >
                <defs>
                  <linearGradient
                    id="totalComplaints"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#198754" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#198754" stopOpacity={0.3} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="4 4" />
                <XAxis dataKey="name" stroke="#198754" />
                <YAxis allowDecimals={false} stroke="#198754" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#d1d5db",
                    borderRadius: 10,
                    fontSize: 14,
                  }}
                  labelStyle={{ color: "#1f2937", fontWeight: 600 }}
                  cursor={{ fill: "#eff6ff" }}
                />
                <Area
                  type="monotone"
                  dataKey="totalComplaints"
                  stroke="#198754"
                  strokeWidth={1}
                  fill="url(#totalComplaints)"
                  dot={{
                    r: 1.2,
                    strokeWidth: 1,
                    strokeWidth: 2,
                    fill: "#fff",
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </>
        )}
      </CardContent>
    </Card>
  );
}
