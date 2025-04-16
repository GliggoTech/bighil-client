import { TableCell } from "@/components/ui/table";
import { getPriorityBadge } from "@/utils/complaintBadges";

export function PriorityCell({ priority }) {
  const priorityBadge = getPriorityBadge(priority);

  return (
    <TableCell>
      <div
        className={`text-center px-2.5 py-1 rounded-full text-xs font-medium border
          ${priorityBadge.bgColor} ${priorityBadge.textColor} ${priorityBadge.borderColor}`}
      >
        {priority}
      </div>
    </TableCell>
  );
}
