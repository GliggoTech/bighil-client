import Particular_complaint from "@/components/UI_Components/Client components/client dashboard components/particular complaints details components/Particular_complaint";
import { fetchServerSideData } from "@/utils/fetchServerSideData";
import { getToken } from "@/lib/getToken";
import { markNotificationAsRead } from "@/lib/markNotificationAsRead";
import { redirect } from "next/navigation";

export default async function ParticularComplaintPage({ params }) {
  const { id } = await params;

  const res = await fetchServerSideData(
    `/api/user-complaints/my-complaints/${id}`,
    {
      method: "GET",
      cache: "no-cache",
    }
  );

  const complaint = res?.complaint;

  if (!complaint) {
    return <div>No Complaint Found</div>;
  }

  return <Particular_complaint complaint={complaint} unread={res.unread} />;
}
