import DepartmentBreakDownHeader from "@/components/UI_Components/ClientStatisticsComponents/DepartmentBreakDownComponents/DepartmentBreakDownHeader";
import DepartmentBreakDownTable from "@/components/UI_Components/ClientStatisticsComponents/DepartmentBreakDownComponents/DepartmentBreakDownTable";
import { fetchServerSideData } from "@/utils/fetchServerSideData";

export default async function DepartmentBreakdownDefault({ params }) {
  const { id } = await params;
  if (!id) return <div>Invalid ID</div>;
  const res = await fetchServerSideData(
    `/api/statisctics/department-breakdown/${id}`,
    {
      method: "GET",
      cache: "no-cache",
    }
  );

  return (
    <div>
      <DepartmentBreakDownHeader data={res} />
      <DepartmentBreakDownTable data={res} />
    </div>
  );
}
