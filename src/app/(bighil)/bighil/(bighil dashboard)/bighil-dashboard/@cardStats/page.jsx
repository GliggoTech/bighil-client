import DashboardCard from "@/components/UI_Components/Bighil Components/bighil dashboard components/DashboardCard";
import { fetchServerSideData } from "@/utils/fetchServerSideData";
const ErrorComponent = () => {
  return (
    <div>
      <h1>Error</h1>
    </div>
  );
};
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

  // console.log(res);
  return (
    <div>
      <DashboardCard metrics={res} />
      {/* <h1>Hello</h1> */}
    </div>
  );
}
