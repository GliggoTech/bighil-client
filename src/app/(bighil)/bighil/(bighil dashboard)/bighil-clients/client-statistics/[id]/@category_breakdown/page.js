import CategoryBreakDownChart from "@/components/UI_Components/ClientStatisticsComponents/CategoryBreakdownComponents/CategoryBreakDownChart";
import CategoryBreakDownHeader from "@/components/UI_Components/ClientStatisticsComponents/CategoryBreakdownComponents/CategoryBreakDownHeader";
import { fetchServerSideData } from "@/utils/fetchServerSideData";

export default async function CategoryBreakdown({ params }) {
  const { id } = await params;
  if (!id) return <div>Invalid ID</div>;
  const res = await fetchServerSideData(
    `/api/statisctics/category-breakdown/${id}`,
    {
      method: "GET",
      cache: "no-cache",
    }
  );


  return (
    <div>
      <CategoryBreakDownHeader data={res} />
      <CategoryBreakDownChart data={res} />
    </div>
  );
}
