import DynamicChartWrapper from "@/components/UI_Components/Bighil Components/DynamicChartWrapper";
import { fetchServerSideData } from "@/utils/fetchServerSideData";

export default async function CategoryStatsPage() {
  const res = await fetchServerSideData(
    "/api/bighil-dashboard/bighil-category-stats",
    {
      method: "GET",
      cache: "no-cache",
    }
  );

  return (
    <div>
      <DynamicChartWrapper
        chartKey="CategoryChart"
        props={{
          categoryData: res,
        }}
      />
    </div>
  );
}
