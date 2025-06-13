import { ComplaintsTableSkeleton } from "@/components/UI_Components/Client components/client dashboard components/admin recent complaints table components/ComplaintsTableSkeleton";
import RecentComplaintsContainer from "@/components/UI_Components/Client components/client dashboard components/admin recent complaints table components/RecentComplaintsContainer";
import { fetchServerSideData } from "@/utils/fetchServerSideData";

export const dynamic = "force-dynamic";

export default async function RecentComplaintsPage() {
  const res = await fetchServerSideData(
    "/api/client-dashboard/recent-complaints",
    {
      method: "GET",
      cache: "no-cache",
    }
  );

  return <RecentComplaintsContainer complaints={res} />;
}
