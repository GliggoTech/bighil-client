import CategoryChart from "@/components/UI_Components/Bighil Components/bighil dashboard components/CategoryChart";
import ErrorComponent from "@/components/UI_Components/Bighil Components/bighil dashboard components/ErrorComponent";
import { fetchServerSideData } from "@/utils/fetchServerSideData";

export default async function CategoryStatsPage() {
  let res;
  try {
    res = await fetchServerSideData(
      "/api/bighil-dashboard/bighil-category-stats",
      {
        method: "GET",
        cache: "no-cache",
      }
    );

    if (!res || res.success === false) {
      return <ErrorComponent />;
    }
  } catch (error) {
    return <ErrorComponent />;
  }

  return (
    <div>
      <CategoryChart categoryData={res} />
    </div>
  );
}
