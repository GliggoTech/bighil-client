import ChatInterface from "@/components/UI_Components/Client components/client dashboard components/particular complaints details components/ChatInterface";
import Particular_complaint from "@/components/UI_Components/Client components/client dashboard components/particular complaints details components/Particular_complaint";
import EvidenceGallery from "@/components/UI_Components/Standard_Components/EvidenceGallery";
import StatusBadge from "@/components/UI_Components/Standard_Components/StatusBadge";
import Timeline from "@/components/UI_Components/USER_Components/USER_Dashboard_Components/Timeline";
import { fetchServerData } from "@/lib/fetchServerSideData";

import { getToken } from "@/lib/getToken";
import { markNotificationAsRead } from "@/lib/markNotificationAsRead";
import {
  Clock,
  AlertCircle,
  CheckCircle2,
  ThumbsDown,
  Paperclip,
  MessageSquare,
  Tag,
  Flag,
} from "lucide-react";
import { redirect } from "next/navigation";

// import Timeline from "@/components/Timeline";

const priorityColors = {
  LOW: "bg-green-100 text-green-800",
  MEDIUM: "bg-yellow-100 text-yellow-800",
  HIGH: "bg-orange-100 text-orange-800",
  CRITICAL: "bg-red-100 text-red-800",
};

export default async function ParticularComplaintPage({
  params,
  searchParams,
}) {
  const { id } = await params;
  const { notificationId } = await searchParams;
  const token = await getToken();
  if (notificationId) {
    const endpoint = "/api/user-notifications/mark-as-read";
    const result = await markNotificationAsRead(
      notificationId,
      token,
      endpoint
    );

    if (result?.success) {
      redirect(`/user/my-complaints/${id}?notificationDecremented=true`);
    }
  }
  let complaint = null;
  const res = await fetchServerData(
    `/api/user-complaints/my-complaints/${id}`,
    {
      method: "GET",
      cache: "no-cache",
    }
  );
  complaint = res.complaint;

  if (!complaint) {
    return <div>No Complaint Found</div>;
  }

  return (
    <>
      <Particular_complaint
        complaint={complaint}
        token={token}
        notificationId={notificationId}
        unread={res.unread}
      />
    </>
  );
}
