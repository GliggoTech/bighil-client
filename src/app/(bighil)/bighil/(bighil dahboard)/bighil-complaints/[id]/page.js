import Particular_complaint from "@/components/UI_Components/Client components/client dashboard components/particular complaints details components/Particular_complaint";
import { fetchServerData } from "@/lib/fetchServerSideData";
import { getToken } from "@/lib/getToken";

import { redirect } from "next/navigation";

export default async function Bighil_Particular_Complaints_Page({
  params,
  searchParams,
}) {
  const { id } = await params;

  const token = await getToken();

  if (!id) return <p>Invalid complaint ID.</p>;
  if (!token) {
    redirect("/");
  }
  let complaint = null;

  const res = await fetchServerData(`/api/bighil/get-complaint/${id}`, {
    method: "GET",
    cache: "no-cache",
  });
  complaint = res.complaint;

  if (!complaint) return <p>Failed to load complaint.</p>;
  return (
    <>
      <Particular_complaint complaint={complaint} />
    </>
  );
}
