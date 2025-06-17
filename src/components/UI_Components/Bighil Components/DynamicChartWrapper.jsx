"use client";

import dynamic from "next/dynamic";
import React from "react";

const chartComponents = {
  TopClientsChart: dynamic(
    () =>
      import(
        "@/components/UI_Components/Bighil Components/bighil dashboard components/TopClientsChart"
      ),
    { ssr: false, loading: () => <div>Loading...</div> }
  ),
  CategoryChart: dynamic(
    () =>
      import(
        "@/components/UI_Components/Bighil Components/bighil dashboard components/CategoryChart"
      ),
    { ssr: false, loading: () => <div>Loading...</div> }
  ),
  BigHillComplaintsChart: dynamic(
    () =>
      import(
        "@/components/UI_Components/Bighil Components/bighil dashboard components/BigHillComplaintsChart"
      ),
    { ssr: false, loading: () => <div>Loading...</div> }
  ),
  SignUpsChart: dynamic(
    () =>
      import(
        "@/components/UI_Components/Bighil Components/bighil dashboard components/SignupChart"
      ),
    { ssr: false, loading: () => <div>Loading...</div> }
  ),
  MaximumComplaintsDepartment: dynamic(
    () =>
      import(
        "@/components/UI_Components/Client components/client dashboard components/MaximumComplaintsDepartment"
      ),
    { ssr: false, loading: () => <div>Loading...</div> }
  ),
  TagAnalyticsDashboard: dynamic(
    () =>
      import(
        "@/components/UI_Components/Client components/client dashboard components/TagAnalyticsDashboard"
      ),
    { ssr: false, loading: () => <div>Loading...</div> }
  ),
};

export default function DynamicChartWrapper({ chartKey, props }) {
  const ChartComponent = chartComponents[chartKey];

  if (!ChartComponent) return <div>Chart not found: {chartKey}</div>;

  return <ChartComponent {...props} />;
}
