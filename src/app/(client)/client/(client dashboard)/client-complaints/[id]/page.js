import Particular_complaint from "@/components/UI_Components/Client components/client dashboard components/particular complaints details components/Particular_complaint";
import { fetchServerData } from "@/lib/fetchServerSidedata";
import { getToken } from "@/lib/getToken";
import { markNotificationAsRead } from "@/lib/markNotificationAsRead";
import { redirect } from "next/navigation";

export default async function Particular_Complaints_Page({
  params,
  searchParams,
}) {
  const { id } = await params;
  const { notificationId } = await searchParams;
  const token = await getToken();

  if (!id) return <p>Invalid complaint ID.</p>;
  if (!token) {
    redirect("/");
  }
  let complaint = null;

  const res = await fetchServerData(`/api/client/get-complaint/${id}`, {
    method: "GET",
    cache: "no-cache",
  });
  complaint = res.complaint;

  if (notificationId) {
    const endpoint = "/api/client-notifications/client-mark-as-read";
    const result = await markNotificationAsRead(
      notificationId,
      token,
      endpoint
    );

    if (result?.success) {
      redirect(`/client/client-complaints/${id}?notificationDecremented=true`);
    }
  }

  if (!complaint) return <p>Failed to load complaint.</p>;
  return (
    <>
      <Particular_complaint
        complaint={complaint}
        user={false}
        unread={res.unread}
      />
    </>
  );
}
