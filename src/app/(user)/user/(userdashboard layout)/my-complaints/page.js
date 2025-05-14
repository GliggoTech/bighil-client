export const dynamic = "force-dynamic";
import ContactComponent from "@/components/UI_Components/PUBLIC_Components/ContactComponent";
import ComplaintCard from "@/components/UI_Components/USER_Components/USER_Dashboard_Components/ComplaintCard";
import { fetchServerSideData } from "@/utils/fetchServerSideData";

import { ClipboardList } from "lucide-react";
import { redirect } from "next/navigation";

export default async function MyComplaintsPage() {
  let complaints = [];
  try {
    complaints = await fetchServerSideData(
      "/api/user-complaints/my-complaints",
      {
        method: "GET",
        cache: "no-cache",
      }
    );
  } catch (error) {
    if (
      error.message === "Not authenticated" ||
      error.message == "NEXT_REDIRECT"
    ) {
      redirect("/");
    }
  }

  return (
    <div className="min-h-screen  p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 space-y-2">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
            My Complaints
          </h1>
          <p className="text-sm text-text_color dark:text-gray-400">
            {complaints.length} registered cases
          </p>
        </div>

        {/* Content Grid */}
        {complaints?.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {complaints?.map((complaint) => (
              <ComplaintCard key={complaint._id} complaint={complaint} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto max-w-md px-4">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-blue-100 rounded-full">
                <ClipboardList className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                No complaints found
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                You have not filed any complaints yet. Start by filing a new
                complaint.
              </p>
            </div>
          </div>
        )}
        {/* <ContactComponent /> */}
        {/* Error Boundary (Handled via Next.js error.js) */}
      </div>
    </div>
  );
}
