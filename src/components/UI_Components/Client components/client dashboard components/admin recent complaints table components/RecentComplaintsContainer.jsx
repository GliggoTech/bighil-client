import { Card } from "@/components/ui/card";
import { ComplaintsHeader } from "./ComplaintsHeader";
import RecentComplaints from "./RecentComplaints";
import { AlertCircle } from "lucide-react";

export default function RecentComplaintsContainer({ complaints }) {
  return (
    <Card className="shadow-md h-full border-none hover:shadow-lg bg-white transition-shadow duration-300">
      <ComplaintsHeader />
      {complaints.length > 0 ? (
        <RecentComplaints complaints={complaints} />
      ) : (
        <div className="text-center flex flex-col justify-center items-center py-8 text-text_color dark:text-text-muted">
          <AlertCircle className="w-6 h-6 mb-2 text-gray-400" />
          <p className="text-sm">No recent complaints found</p>
        </div>
      )}
      {/* <RecentComplaints complaints={complaints} /> */}
    </Card>
  );
}
