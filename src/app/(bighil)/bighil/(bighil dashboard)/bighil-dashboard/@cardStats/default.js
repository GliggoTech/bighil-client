import DashboardCard from "@/components/UI_Components/Bighil Components/bighil dashboard components/DashboardCard";
import ErrorComponent from "@/components/UI_Components/Bighil Components/bighil dashboard components/ErrorComponent";
import { fetchServerSideData } from "@/utils/fetchServerSideData";
import { TriangleAlert } from "lucide-react";

export default async function CardsStatusPage() {
  let res;
  try {
    res = await fetchServerSideData("/api/bighil-dashboard/bighil-cards", {
      method: "GET",
      cache: "no-cache",
    });
    if (!res || res.success === false) {
      return <ErrorComponent />;
    }
  } catch (error) {
    return <ErrorComponent />;
  }

  return (
    <div>
      <DashboardCard metrics={res} />
      {/* <h1>Hello</h1> */}
    </div>
  );
}
