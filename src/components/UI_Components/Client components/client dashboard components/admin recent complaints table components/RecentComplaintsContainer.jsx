import { Card } from "@/components/ui/card";
import { ComplaintsHeader } from "./ComplaintsHeader";
import { RecentComplaintsTable } from "./RecentComplaintsTable";

export default function RecentComplaintsContainer({ complaints }) {
  return (
    <Card className="shadow-md h-full hover:shadow-lg bg-white transition-shadow duration-300">
      <ComplaintsHeader />
      <RecentComplaintsTable complaints={complaints} />
    </Card>
  );
}
