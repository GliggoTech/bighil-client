"use client";

import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
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

const chartConfig = {
  // total: {
  //   label: "Total",
  //   color: "hsl(var(--chart-1))",
  // },
  // Pending: {
  //   label: "Pending",
  //   color: "hsl(var(--chart-2))",
  // },
  // "In Progress": {
  //   label: "In Progress",
  //   color: "hsl(var(--chart-3))",
  // },
  // Resolved: {
  //   label: "Resolved",
  //   color: "hsl(var(--chart-4))",
  // },
  Unwanted: {
    label: "Unwanted",
    color: "hsl(var(--chart-5))",
  },
};

export default function ComplaintsChart() {
  const [data, setData] = useState([]);
  const token = useAccessToken();
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
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

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
    <Card className="w-full">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Complaints Timeline</CardTitle>
          <CardDescription>
            Showing complaint activity for the selected time period
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={handleTimeRangeChange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select time range"
          >
            <SelectValue placeholder="Last 7 days" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="7" className="rounded-lg">
              Last 7 days
            </SelectItem>
            <SelectItem value="30" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="90" className="rounded-lg">
              Last 90 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
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
              <div className="rounded-lg  bg-surface-light dark:bg-surface-dark p-3">
                <p className="text-sm text-text-secondary dark:text-text-muted">
                  Total Complaints
                </p>
                <p className="text-2xl font-bold text-text_color dark:text-text-light">
                  {summary.total}
                </p>
              </div>

              <div className="rounded-lg  bg-surface-light dark:bg-surface-dark p-3">
                <p className="text-sm text-text-secondary dark:text-text-muted">
                  Daily Average
                </p>
                <p className="text-2xl font-bold text-text_color dark:text-text-light">
                  {summary.dailyAvg}
                </p>
              </div>

              <div className="rounded-lg  bg-surface-light dark:bg-surface-dark p-3">
                <p className="text-sm text-text-secondary dark:text-text-muted">
                  Period
                </p>
                <p className="text-2xl font-bold text-text_color dark:text-text-light">
                  {timeRange} days
                </p>
              </div>

              <div className="rounded-lg  bg-surface-light dark:bg-surface-dark p-3">
                <p className="text-sm text-text-secondary dark:text-text-muted">
                  Last Updated
                </p>
                <p className="text-lg font-medium text-text_color dark:text-text-light">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>

            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    {Object.entries(chartConfig).map(([key, config]) => (
                      <linearGradient
                        key={key}
                        id={`fill-${key}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={config.color}
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor={config.color}
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32}
                    tickFormatter={formatDate}
                    angle={-45}
                    textAnchor="end"
                    color="yellow"
                  />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        labelFormatter={formatDate}
                        indicator="dot"
                      />
                    }
                  />
                  {/* <Area
                    dataKey="totalComplaints"
                    type="monotone"
                    fill="url(#fill-Pending)"
                    stroke={chartConfig.Pending.color}
                    stackId="a"
                  />
                  <Area
                    dataKey="totalComplaints"
                    type="monotone"
                    fill="url(#fill-In Progress)"
                    stroke={chartConfig["In Progress"].color}
                    stackId="a"
                  /> */}
                  {/* <Area
                    dataKey="totalComplaints"
                    type="monotone"
                    fill="url(#fill-Resolved)"
                    stroke={chartConfig.Resolved.color}
                    stackId="a"
                  /> */}
                  <Area
                    dataKey="totalComplaints"
                    type="monotone"
                    fill="url(#fill-Unwanted)"
                    stroke={chartConfig.Unwanted.color}
                    stackId="a"
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </>
        )}
      </CardContent>
    </Card>
  );
}
