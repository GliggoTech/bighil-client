import Particular_complaint from "@/components/UI_Components/Client components/client dashboard components/particular complaints details components/Particular_complaint";
import { fetchServerSideData } from "@/utils/fetchServerSideData";
import { redirect } from "next/navigation";

export default async function ParticularComplaintPage({ params }) {
  try {
    const { id } = params;

    if (!id) {
      redirect("/"); // Malformed URL, redirect to home or 404
    }

    const res = await fetchServerSideData(
      `/api/user-complaints/my-complaints/${id}`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );

    if (!res?.complaint) {
      redirect("/"); // Or optionally return a 404 component
    }

    return (
      <Particular_complaint complaint={res.complaint} unread={res.unread} />
    );
  } catch (error) {
    console.error("Failed to fetch complaint:", error);
    redirect("/"); // fallback if something crashes
  }
}
