// import ContactComponent from "@/components/UI_Components/PUBLIC_Components/ContactComponent";
import PaginationControlsWrapper from "@/components/UI_Components/Standard_Components/PaginationControlsWrapper";
import Notification_Component from "@/components/UI_Components/USER_Components/USER_Dashboard_Components/Notification_Component";
import { fetchServerSideData } from "@/utils/fetchServerSideData";

export default async function User_Notification_Page({ searchParams }) {
  const { page } = await searchParams;
  const limit = 10;

  let notifications;

  const res = await fetchServerSideData(
    `/api/user-notifications/my-notifications?page=${page}&limit=${limit}`,
    { method: "GET", cache: "no-cache" } // Always fetch fresh data
  );
  notifications = res.notifications;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 min-h-screen">
      <Notification_Component
        notifications={notifications}
        totalUnread={res.totalUnread}
        totalPages={res.totalPages}
      />

      <div className="w-full flex justify-between items-center">
        <PaginationControlsWrapper
          currentPage={res.currentPage}
          totalPages={res.totalPages}
          hasNextPage={res.hasNextPage}
          hasPreviousPage={res.hasPreviousPage}
        />
      </div>
      {/* <ContactComponent /> */}
    </div>
  );
}
