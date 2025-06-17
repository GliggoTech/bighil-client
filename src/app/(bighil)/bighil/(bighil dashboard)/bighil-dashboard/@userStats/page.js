import { fetchServerSideData } from "@/utils/fetchServerSideData";
import DynamicChartWrapper from "@/components/UI_Components/Bighil Components/DynamicChartWrapper";

export default async function UserStatsPage() {
  const res = await fetchServerSideData(
    "/api/bighil-dashboard/bighil-user-stats",
    {
      method: "GET",
      cache: "no-cache",
    }
  );

  return (
    <div>
      <DynamicChartWrapper
        chartKey="SignUpsChart"
        props={{
          last7DaysSignups: res.last7DaysSignups,
          totalUsers: res.totalUsers,
          todayActiveUsers: res.todayActiveUsers,
        }}
      />
    </div>
  );
}
