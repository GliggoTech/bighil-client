import RecentNotification from "@/components/UI_Components/Client components/client dashboard components/RecentNotification";
import { fetchServerSideData } from "@/utils/fetchServerSideData";

export const dynamic = "force-dynamic";
export default async function Recent_Notifications_page() {
  let res;
  try {
    res = await fetchServerSideData(
      "/api/client-dashboard/recent-notifications",
      {
        method: "GET",
        cache: "no-cache",
      }
    );
  } catch (error) {
    console.log(error);
    return (
      <div>
        <h1>Error in fetching recent notifications</h1>
      </div>
    );
  }

  return <RecentNotification recentNotifications={res} />;
}
