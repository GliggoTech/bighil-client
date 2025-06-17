// File: src/app/...(your path).../ChartSlot.jsx (or .js)

import DynamicChartWrapper from "@/components/UI_Components/Bighil Components/DynamicChartWrapper";
import { fetchServerSideData } from "@/utils/fetchServerSideData";

export default async function ChartSlot({ params }) {
  const { filter = "1year" } = params || {};

  const res = await fetchServerSideData(
    `/api/bighil-dashboard/bighil-complaints-stats?filter=${filter}`
  );

  return (
    <div>
      <DynamicChartWrapper
        chartKey="BigHillComplaintsChart"
        props={{
          data: res,
          filter: filter,
        }}
      />
    </div>
  );
}
