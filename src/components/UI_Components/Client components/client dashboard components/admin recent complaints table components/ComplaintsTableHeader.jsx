import { TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { COMPLAINT_TABLE_COLUMNS } from "@/lib/dashboard constants/dashboard";

export function ComplaintsTableHeader() {
  return (
    <TableHeader>
      <TableRow className="bg-background-secondary hover:bg-background-secondary dark:bg-surface-dark dark:hover:bg-surface-dark pl-2">
        {COMPLAINT_TABLE_COLUMNS.map((column) => (
          <TableHead
            key={column.key}
            className={`${column.width} ${column.padding} font-bold text-black`}
          >
            {column.label}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
