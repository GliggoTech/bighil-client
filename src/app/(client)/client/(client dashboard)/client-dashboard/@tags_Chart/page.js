import { TagAnalyticsDashboard } from "@/components/UI_Components/Client components/client dashboard components/TagAnalyticsDashboard";
import { ChartsSkeletonLoader } from "@/components/UI_Components/Standard_Components/skeletons/ChartsSkeletonLoader";
import { fetchServerSideData } from "@/utils/fetchServerSideData";
import { Suspense } from "react";

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
      <TagAnalyticsDashboard
        tagData={res?.tagStats}
        totalComplaints={res.totalComplaints}
      />
    </div>
  );
}
