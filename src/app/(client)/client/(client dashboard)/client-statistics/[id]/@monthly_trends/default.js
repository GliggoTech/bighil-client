import BarAndLineChart from "@/components/UI_Components/ClientStatisticsComponents/clientMonthlyTrendComponents/BarAndLineChart";
import MonthlyTrendHeader from "@/components/UI_Components/ClientStatisticsComponents/clientMonthlyTrendComponents/MonthlyTrendHeader";
import { fetchServerSideData } from "@/utils/fetchServerSideData";

export default async function Monthly_TrendsDefault({ params }) {
  const { id } = await params;
  if (!id) return <div>Invalid ID</div>;
  const res = await fetchServerSideData(
    `/api/statisctics/monthly-trends/${id}`,
    {
      method: "GET",
      cache: "no-cache",
    }
  );

  return (
    <div>
      <MonthlyTrendHeader />

      <BarAndLineChart data={res} />
    </div>
  );
}
