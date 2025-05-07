import ErrorComponent from "@/components/UI_Components/Bighil Components/bighil dashboard components/ErrorComponent";
import TopClientsChart from "@/components/UI_Components/Bighil Components/bighil dashboard components/TopClientsChart";
import { fetchServerSideData } from "@/utils/fetchServerSideData";

export default async function ClientsStatsPage() {
  let res;
  try {
    res = await fetchServerSideData(
      "/api/bighil-dashboard/bighil-client-stats",
      {
        method: "GET",
        cache: "no-cache",
      }
    );

    if (!res || res.success === false) {
      return <ErrorComponent />;
    }
  } catch (error) {
    return <ErrorComponent />;
  }

  return (
    <div>
      <TopClientsChart
        totalClients={res.totalClients}
        topClients={res.topClients}
      />
    </div>
  );
}
