// page.js
import { MaximumComplaintsAgainst } from "@/components/UI_Components/Client components/client dashboard components/MaximumComplaintsAgainst";
import { fetchServerData } from "@/lib/fetchServerSidedata";
export const dynamic = "force-dynamic";
export default async function More_Nuumber_Of_Complaints_Against() {
  let res;
  try {
    res = await fetchServerData(
      `/api/client-dashboard/more-complaints-against`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );
  } catch (error) {
    console.log(error);
    return <div>Error from more-complaints-against</div>;
  }

  return <MaximumComplaintsAgainst data={res} />;
}
