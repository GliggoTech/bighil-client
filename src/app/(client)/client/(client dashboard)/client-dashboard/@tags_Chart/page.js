import { TagAnalyticsDashboard } from "@/components/UI_Components/Client components/client dashboard components/TagAnalyticsDashboard";
import { ChartsSkeletonLoader } from "@/components/UI_Components/Standard_Components/skeletons/ChartsSkeletonLoader";
import { fetchServerSideData } from "@/utils/fetchServerSideData";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function KeyWordChartPage() {
  let res;
  try {
    res = await fetchServerSideData("/api/client-dashboard/keywords-charts", {
      method: "GET",
      cache: "no-cache",
    });
  } catch (error) {
    console.error(error);
    return <div>Failed to fetch data</div>;
  }

  return (
    <div className="space-y-4">
      <TagAnalyticsDashboard
        tagData={res?.tagStats}
        totalComplaints={res.totalComplaints}
      />
    </div>
  );
}
