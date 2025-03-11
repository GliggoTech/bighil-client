import { TableRow, TableCell } from "@/components/ui/table";
import { CompanyCell } from "./CompanyCell";
import { IssueCell } from "./IssueCell";
import { StatusCell } from "./StatusCell";
import { PriorityCell } from "./PriorityCell";
import { ComplaintIdCell } from "./ComplaintIdCell";

export function ComplaintRow({ complaint }) {
  return (
    <TableRow className="hover:bg-background-tertiary dark:hover:bg-background-dark cursor-pointer transition-colors p-2 h-[60px]">
      {/* <CompanyCell complaint={complaint} /> */}
      <IssueCell complaint={complaint} />
      <StatusCell status={complaint.status_of_client} />
      <PriorityCell priority={complaint.priority} />
      <ComplaintIdCell id={complaint.complaintId} complaintId={complaint._id} />
    </TableRow>
  );
}
