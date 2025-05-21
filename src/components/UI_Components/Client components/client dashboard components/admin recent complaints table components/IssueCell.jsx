import { TableCell } from "@/components/ui/table";

export function IssueCell({ complaint }) {
  return (
    <TableCell>
      <div>
        <div className="font-medium text-sm text-text_color dark:text-text-light pl-2">
          {complaint.submissionType}
        </div>
        <div className="text-xs text-text-secondary dark:text-text-muted truncate max-w-[10px] pl-2">
          {complaint.complaintMessage}
        </div>
      </div>
    </TableCell>
  );
}
