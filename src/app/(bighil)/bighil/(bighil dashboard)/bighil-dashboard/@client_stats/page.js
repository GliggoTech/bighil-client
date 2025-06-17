import { fetchServerSideData } from "@/utils/fetchServerSideData";
import DynamicChartWrapper from "@/components/UI_Components/Bighil Components/DynamicChartWrapper";

export default async function ClientsStatsPage() {
  const res = await fetchServerSideData(
    "/api/bighil-dashboard/bighil-client-stats",
    {
      method: "GET",
      cache: "no-cache",
    }
  );

  return (
    <div>
      <DynamicChartWrapper
        chartKey="TopClientsChart"
        props={{
          totalClients: res.totalClients,
          topClients: res.topClients,
        }}
      />
    </div>
  );
}
