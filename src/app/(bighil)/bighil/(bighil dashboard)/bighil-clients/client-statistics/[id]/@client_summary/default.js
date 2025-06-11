import ClientSummaryContainer from "@/components/UI_Components/ClientStatisticsComponents/ClientSummaryCardComponents/ClientSummaryContainer";
import ClientSummaryHeader from "@/components/UI_Components/ClientStatisticsComponents/ClientSummaryCardComponents/ClientSummaryHeader";
import { fetchServerSideData } from "@/utils/fetchServerSideData";

export default async function ClientSummaryDefault({params}) {
  const { id } = await params;
  const res = await fetchServerSideData(
    `/api/statisctics/client-summary/${id}`,
    {
      method: "GET",
      cache: "no-cache",
    }
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className=" ">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <ClientSummaryHeader
            companyName={res["Company Name"]}
            firstComplaintDate={res["First Complaint Date"]}
            totalComplaints={res["Total Complaints Filed"]}
          />
          <ClientSummaryContainer data={res} />
        </div>
      </div>
    </div>
  );
}
