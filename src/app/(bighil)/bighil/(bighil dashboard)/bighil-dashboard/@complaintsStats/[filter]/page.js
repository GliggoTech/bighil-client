// app/dashboard/@chart/[filter]/page.tsx
import BigHillComplaintsChart from "@/components/UI_Components/Bighil Components/bighil dashboard components/BigHillComplaintsChart";
import { fetchServerSideData } from "@/utils/fetchServerSideData";

export default async function ChartSlot({ params }) {
  const paramsValue = await params;
  const { filter } = paramsValue || "1year";

  try {
    const res = await fetchServerSideData(
      `/api/bighil-dashboard/bighil-complaints-stats?filter=${filter}`
    );

    if (!res || res.success === false) {
      return <div>Error loading chart...</div>;
    }

    return <BigHillComplaintsChart data={res} filter={filter} />;
  } catch {
    return <div>Unexpected error.</div>;
  }
}
