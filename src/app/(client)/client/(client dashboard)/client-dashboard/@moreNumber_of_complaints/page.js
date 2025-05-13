// page.js
import { MaximumComplaintsAgainst } from "@/components/UI_Components/Client components/client dashboard components/MaximumComplaintsAgainst";
import { fetchServerSideData } from "@/utils/fetchServerSideData";

export const dynamic = "force-dynamic";
export default async function More_Number_Of_Complaints_Against() {
  let res;
  try {
    res = await fetchServerSideData(
      `/api/client-dashboard/more-complaints-against`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );
  } catch (error) {
    return <div>Error from more-complaints-against</div>;
  }

  return <MaximumComplaintsAgainst data={res} />;
}
