import PatternAndEscalation from "@/components/UI_Components/ClientStatisticsComponents/PatternAndEscalationComponents/PatternAndEscalation";
import { fetchServerSideData } from "@/utils/fetchServerSideData";

export default async function PatternAndEscalationDefault({ params }) {
  const { id } = await params;
  if (!id) return <div>Invalid ID</div>;
  const res = await fetchServerSideData(
    `/api/statisctics/pattern-escalation/${id}`,
    {
      method: "GET",
      cache: "no-cache",
    }
  );

  return (
    <div>
      <PatternAndEscalation data={res} />
    </div>
  );
}
