import Particular_complaint from "@/components/UI_Components/Client components/client dashboard components/particular complaints details components/Particular_complaint";
import { fetchServerSideData } from "@/utils/fetchServerSideData";
import { notFound, redirect } from "next/navigation";

export default async function ParticularComplaintPage({ params }) {
  try {
    const complaintIdParams = await params;
    const { id } = complaintIdParams;

    if (!id) {
      notFound();
    }

    const res = await fetchServerSideData(
      `/api/user-complaints/my-complaints/${id}`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );

    if (!res?.complaint) {
      notFound();
    }

    return (
      <Particular_complaint complaint={res.complaint} unread={res.unread} />
    );
  } catch (error) {
    notFound();
  }
}
