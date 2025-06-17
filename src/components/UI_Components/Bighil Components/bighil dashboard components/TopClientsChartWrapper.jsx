// File: components/UI_Components/Bighil Components/bighil dashboard components/TopClientsChartWrapper.jsx
"use client";

import dynamic from "next/dynamic";

const TopClientsChart = dynamic(() => import("./TopClientsChart"), {
  ssr: false,
});

export default function TopClientsChartWrapper({ totalClients, topClients }) {
  return (
    <TopClientsChart totalClients={totalClients} topClients={topClients} />
  );
}
