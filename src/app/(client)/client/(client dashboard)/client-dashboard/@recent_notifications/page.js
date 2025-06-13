import RecentNotification from "@/components/UI_Components/Client components/client dashboard components/RecentNotification";
import { fetchServerSideData } from "@/utils/fetchServerSideData";

export const dynamic = "force-dynamic";
export default async function Recent_Notifications_page() {
  const res = await fetchServerSideData(
    "/api/client-dashboard/recent-notifications",
    {
      method: "GET",
      cache: "no-cache",
    }
  );

  return <RecentNotification recentNotifications={res} />;
}
