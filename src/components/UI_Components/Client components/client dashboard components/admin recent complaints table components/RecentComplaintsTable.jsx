import { TableBody } from "@/components/ui/table";
import { ComplaintRow } from "./ComplaintRow";
import { ComplaintsTableHeader } from "./ComplaintsTableHeader";
import { TableWrapper } from "./TableWrapper";

export function RecentComplaintsTable({ complaints }) {
  return (
    <TableWrapper>
      <ComplaintsTableHeader />
      <TableBody className="p-2">
        {complaints.map((complaint) => (
          <ComplaintRow key={complaint._id} complaint={complaint} />
        ))}
      </TableBody>
    </TableWrapper>
  );
}
