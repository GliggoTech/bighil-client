import { Card } from "@/components/ui/card";
import { ComplaintsHeader } from "./ComplaintsHeader";
import RecentComplaints from "./RecentComplaints";

export default function RecentComplaintsContainer({ complaints }) {
  return (
    <Card className="shadow-md h-full border-none hover:shadow-lg bg-white transition-shadow duration-300">
      <ComplaintsHeader />
      <RecentComplaints complaints={complaints} />
    </Card>
  );
}
