// components/complaints/TableWrapper.js
import { Table } from "@/components/ui/table";
import { CardContent } from "@/components/ui/card";

export function TableWrapper({ children }) {
  return (
    <CardContent className="p-0">
      <Table>{children}</Table>
    </CardContent>
  );
}
