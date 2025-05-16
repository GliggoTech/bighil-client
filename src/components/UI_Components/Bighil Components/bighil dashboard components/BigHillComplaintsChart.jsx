"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import useAccessToken from "@/custom hooks/useAccessToken";
import useFetch from "@/custom hooks/useFetch";
import { getBackendUrl } from "@/lib/getBackendUrl";
import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const FILTER_OPTIONS = [
  { label: "1 Year", value: "1year" },
  { label: "6 Months", value: "6months" },
  { label: "3 Months", value: "3months" },
];

const BigHillComplaintsChart = ({ data, filter }) => {
  const [currentFilter, setCurrentFilter] = useState(filter || "1year");
  const [chartData, setChartData] = useState(data || backendData || []);
  const { token } = useAccessToken();

  const { loading, fetchData, error, data: backendData } = useFetch();

  // Function to fetch data from the server
  const fetchChartData = async (filterValue) => {
    try {
      const url = getBackendUrl();
      const response = await fetchData(
        `${url}/api/bighil-dashboard/bighil-complaints-stats?filter=${filterValue}`,
        "GET",
        {},
        token,
        false
      );

      setChartData(response.data);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  // Handle filter change with client-side data fetching
  const handleFilterChange = (value) => {
    setCurrentFilter(value);

    // Fetch new data based on selected filter
    fetchChartData(value);

    // Update URL without full page refresh to avoid parallel routes issues
    window.history.pushState(
      { filter: value },
      "",
      `/bighil/bighil-dashboard/${value}`
    );
  };

  const exportCSV = () => {
    const headers = Object.keys(chartData[0]).filter((key) => key !== "fill");

    const csvContent = [
      headers.join(","),
      ...chartData.map((row) => headers.map((key) => row[key]).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `complaints_${currentFilter}.csv`;
    link.click();
  };

  return (
    <Card className="p-4 shadow-xl backdrop-blur-3xl border-none bg-white ">
      <CardContent className="p-0 relative">
        <div className="space-y-4">
          <div className="flex justify-end items-center">
            <div className="flex items-center gap-4">
              <Select value={currentFilter} onValueChange={handleFilterChange}>
                <SelectTrigger className="w-[150px] border-light-border-subtle bg-primary-bg-subtle hover:bg-primary-bg-subtle-hover">
                  <SelectValue placeholder="Select Filter" />
                </SelectTrigger>
                <SelectContent className="bg-white border-light-border-subtle">
                  {FILTER_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                onClick={exportCSV}
                className="bg-primary text-white font-light hover:bg-primary/90"
              >
                Export as CSV
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                style={{
                  borderRadius: "10px",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#FFFFFF",
                  padding: "0.5rem",
                }}
              >
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient
                    id="colorResolved"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient
                    id="colorInProgress"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#facc15" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#facc15" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient
                    id="colorUnwanted"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0.1} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 4" />
                <XAxis dataKey="name" stroke="#8884d8" />
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

                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#4f46e5"
                  fill="url(#colorTotal)"
                />
                <Area
                  type="monotone"
                  dataKey="resolved"
                  stroke="#16a34a"
                  fill="url(#colorResolved)"
                />
                <Area
                  type="monotone"
                  dataKey="inProgress"
                  stroke="#facc15"
                  fill="url(#colorInProgress)"
                />
                <Area
                  type="monotone"
                  dataKey="pending"
                  stroke="#ef4444"
                  fill="url(#colorPending)"
                />
                <Area
                  type="monotone"
                  dataKey="unwanted"
                  stroke="#a855f7"
                  fill="url(#colorUnwanted)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}

          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-sm">Total</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "hsl(142, 76%, 36%)" }}
              ></div>
              <span className="text-sm">Resolved</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "hsl(48, 96%, 53%)" }}
              ></div>
              <span className="text-sm">In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "hsl(0, 84%, 60%)" }}
              ></div>
              <span className="text-sm">Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "hsl(280, 87%, 65%)" }}
              ></div>
              <span className="text-sm">Unwanted</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BigHillComplaintsChart;
