// components/complaints/cells/StatusCell.js
import { TableCell } from "@/components/ui/table";
import { getStatusBadge } from "@/utils/complaintBadges";

export function StatusCell({ status }) {
  const statusBadge = getStatusBadge(status);

  return (
    <TableCell>
      <div
        className={`inline-flex items-center rounded-full text-xs font-medium border-2
          ${statusBadge.bgColor}
          ${statusBadge.textColor}
          ${statusBadge.borderColor}
          ${statusBadge.padding}
          transition-colors duration-200
        
        `}
      >
        {statusBadge.icon}
        <span>{status}</span>
      </div>
    </TableCell>
  );
}
