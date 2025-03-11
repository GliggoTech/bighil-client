import ComplaintFilter from "@/components/UI_Components/Standard_Components/ComplaintFilter";
import PaginationControls from "@/components/UI_Components/Standard_Components/PaginationControls";
import { fetchServerData } from "@/lib/fetchServerSidedata";
import { getToken } from "@/lib/getToken";

import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function ClientComplaintsPage({ searchParams }) {
  // Pagination parameters
  // const token = await getToken();

  // if (!token) {
  //   redirect("/");
  // }
  // const { page } = await searchParams;

  // let complaints;

  // const res = await fetchServerData(`/api/client/get-complaints?page=${page}`, {
  //   method: "GET",
  //   cache: "no-cache",
  // });
  // complaints = res.complaints;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <ComplaintFilter />
    </div>
  );
}
