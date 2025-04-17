import { ComplaintsError } from "@/components/UI_Components/Client components/client dashboard components/admin recent complaints table components/ComplaintsError";
import { ComplaintsTableSkeleton } from "@/components/UI_Components/Client components/client dashboard components/admin recent complaints table components/ComplaintsTableSkeleton";
import RecentComplaintsContainer from "@/components/UI_Components/Client components/client dashboard components/admin recent complaints table components/RecentComplaintsContainer";
import { fetchServerData } from "@/lib/fetchServerSideData";

import { Suspense } from "react";
export const dynamic = "force-dynamic";
export default async function RecentComplaintsPage() {
  let res;
  try {
    res = await fetchServerData("/api/client-dashboard/recent-complaints", {
      method: "GET",
      cache: "no-cache",
    });
  } catch (error) {
    console.log(error);
    return <ComplaintsError />;
  }

  return <RecentComplaintsContainer complaints={res} />;
}
