// components/complaints/cells/CompanyCell.js
import { TableCell } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CalendarIcon } from "lucide-react";
import { formatDate } from "@/lib/formatDateFun";

export function CompanyCell({ complaint }) {
  return (
    <TableCell className="font-medium w-60">
      <div className="flex items-center space-x-2">
        {/* <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary-light/10 text-primary text-xs">
            {complaint.companyName.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar> */}
        <div>
          <div className="font-medium text-text-primary dark:text-text-light">
            {complaint.companyName}
          </div>
          <div className=" text-text-secondary dark:text-text-muted flex items-center">
            <CalendarIcon className="mr-1 h-3 w-3" />
            {formatDate(complaint.createdAt)}
          </div>
        </div>
      </div>
    </TableCell>
  );
}
