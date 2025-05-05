import { Users } from "lucide-react";
import ErrorComponent from "@/components/UI_Components/Bighil Components/bighil dashboard components/ErrorComponent";
import { fetchServerSideData } from "@/utils/fetchServerSideData";
import SignupChart from "@/components/UI_Components/Bighil Components/bighil dashboard components/SignupChart";

export default async function UserStatsPage() {
  let res;
  try {
    res = await fetchServerSideData("/api/bighil-dashboard/bighil-user-stats", {
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
    <div className="p-3 sm:p-4 md:p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Total Users */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
          <h1 className="text-sm sm:text-base md:text-lg font-medium text-gray-800 flex items-center gap-1">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
            <span>Total Users</span>
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-black">
            {res.totalUsers}
          </p>
        </div>

        {/* Today's Active Users */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
          <h1 className="text-sm sm:text-base md:text-lg font-medium text-gray-800 flex items-center gap-1">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
            <span>Today&apos;s Active Users</span>
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-black">
            {res.todayActiveUsers}
          </p>
        </div>
      </div>

      {/* Signup Chart */}
      <SignupChart last7DaysSignups={res.last7DaysSignups} />
    </div>
  );
}
