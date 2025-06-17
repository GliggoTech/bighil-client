import DynamicChartWrapper from "@/components/UI_Components/Bighil Components/DynamicChartWrapper";
import { fetchServerSideData } from "@/utils/fetchServerSideData";

export const dynamic = "force-dynamic";

export default async function More_Number_Of_Complaints_Against() {
  const res = await fetchServerSideData(
    `/api/client-dashboard/top-department`,
    {
      method: "GET",
      cache: "no-cache",
    }
  );

  return (
    <div>
      <DynamicChartWrapper
        chartKey="MaximumComplaintsDepartment"
        props={{ data: res }}
      />
    </div>
  );
}
