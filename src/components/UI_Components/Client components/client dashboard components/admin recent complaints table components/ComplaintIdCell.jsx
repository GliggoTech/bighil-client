import { TableCell } from "@/components/ui/table";
import Link from "next/link";

export function ComplaintIdCell({ id, complaintId }) {
  return (
    <TableCell>
      <Link
        href={`/client/client-complaints/${complaintId}`}
        className="text-primary hover:text-primary-dark dark:hover:text-primary-light transition-colors hover:underline"
      >
        {id}
      </Link>
    </TableCell>
  );
}
