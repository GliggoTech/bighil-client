import DynamicChartWrapper from "@/components/UI_Components/Bighil Components/DynamicChartWrapper";
import { fetchServerSideData } from "@/utils/fetchServerSideData";

export const dynamic = "force-dynamic";

export default async function KeyWordChartPage() {
  const res = await fetchServerSideData(
    "/api/client-dashboard/keywords-charts",
    {
      method: "GET",
      cache: "no-cache",
    }
  );

  return (
    <div className="space-y-4">
      <DynamicChartWrapper
        chartKey="TagAnalyticsDashboard"
        props={{
          tagData: res?.tagStats,
          totalComplaints: res.totalComplaints,
        }}
      />
    </div>
  );
}
