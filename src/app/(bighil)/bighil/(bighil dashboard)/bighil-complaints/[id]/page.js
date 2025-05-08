import ErrorComponent from "@/components/UI_Components/Bighil Components/bighil dashboard components/ErrorComponent";
import Particular_complaint from "@/components/UI_Components/Client components/client dashboard components/particular complaints details components/Particular_complaint";

import { getToken } from "@/lib/getToken";
import { fetchServerSideData } from "@/utils/fetchServerSideData";

import { redirect } from "next/navigation";

export default async function Bighil_Particular_Complaints_Page({ params }) {
  try {
    const complaintIdParams = await params;
    const { id } = complaintIdParams;
    // const { id } = params;

    if (!id) {
      console.error("No ID provided in params.");
      return <ErrorComponent message="Complaint ID is missing." />;
    }

    const token = await getToken();
    if (!token) {
      redirect("/");
    }

    const res = await fetchServerSideData(`/api/bighil/get-complaint/${id}`, {
      method: "GET",
      cache: "no-cache",
    });

    return <Particular_complaint complaint={res.complaint} />;
  } catch (error) {
    console.error("Error loading complaint:", error);
    return <ErrorComponent message={error} />;
  }
}
