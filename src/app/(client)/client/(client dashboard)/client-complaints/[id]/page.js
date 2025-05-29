import Particular_complaint from "@/components/UI_Components/Client components/client dashboard components/particular complaints details components/Particular_complaint";
import { fetchServerSideData } from "@/utils/fetchServerSideData";


export default async function Particular_Complaints_Page({ params }) {
  const { id } = await params;


  if (!id) return <p>Invalid complaint ID.</p>;

  const res = await fetchServerSideData(`/api/client/get-complaint/${id}`, {
    method: "GET",
    cache: "no-cache",
  });

  return (
    <Particular_complaint
      complaint={res.complaint}
      user={false}
      unread={res.unread}
    />
  );
}
