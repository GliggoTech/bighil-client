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

  const visibilityResponse = await fetchServerSideData(
    "/api/client/visible-to-it",
    {
      method: "GET",
      cache: "no-cache",
    }
  );
  console.log(visibilityResponse);

  const { visibleToIT, role } = visibilityResponse || {};

  const isPrivilegedRole = ["ADMIN", "SUB ADMIN", "SUPER ADMIN"].includes(role);

  // Show table if visibleToIT is true and role is allowed
  // Or if visibleToIT is false but role is SUB_ADMIN or SUPER_ADMIN
  const showTable =
    (visibleToIT === true && isPrivilegedRole) ||
    (visibleToIT === false && ["SUB ADMIN", "SUPER ADMIN"].includes(role));

  if (!showTable) return null;

  return <RecentComplaintsContainer complaints={res} />;
}
