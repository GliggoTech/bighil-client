import ErrorComponent from "@/components/UI_Components/Bighil Components/bighil dashboard components/ErrorComponent";
import { fetchServerSideData } from "@/utils/fetchServerSideData";
import SignupChart from "@/components/UI_Components/Bighil Components/bighil dashboard components/SignupChart";

export default async function UserStatsPage() {
  let res;
  try {
    res = await fetchServerSideData("/api/bighil-dashboard/bighil-user-stats", {
      method: "GET",
      cache: "no-cache",
    });

    if (!res || res.success === false) {
      return <ErrorComponent />;
    }
  } catch (error) {
    return <ErrorComponent />;
  }
  console.log(res);
  return (
    <SignupChart
      last7DaysSignups={res.last7DaysSignups}
      totalUsers={res.totalUsers}
      todayActiveUsers={res.todayActiveUsers}
    />
  );
}
