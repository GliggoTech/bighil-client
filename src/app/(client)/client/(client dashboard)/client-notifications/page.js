import PaginationControls from "@/components/UI_Components/Standard_Components/PaginationControls";
import Notification_Component from "@/components/UI_Components/USER_Components/USER_Dashboard_Components/Notification_Component";
import { fetchServerData } from "@/lib/fetchServerSidedata";

export default async function Client_Notification_Page({ searchParams }) {
  const { page } = await searchParams;
  const limit = 10;

  let notifications;

  const res = await fetchServerData(
    `/api/client-notifications/my-client-notifications?page=${page}&limit=${limit}`,
    { method: "GET", cache: "no-cache" } // Always fetch fresh data
  );
  notifications = res.notifications;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Notification_Component notifications={notifications} />
      {/* <NotificationContainer notifications={notifications} /> */}
      {res && res.totalPages > 1 && (
        <div className="w-full flex justify-between items-center">
          <PaginationControls
            currentPage={res.currentPage}
            totalPages={res.totalPages}
            hasNextPage={res.hasNextPage}
            hasPreviousPage={res.hasPreviousPage}
          />
        </div>
      )}
    </div>
  );
}
