// components/complaints/TableWrapper.js
import { Table } from "@/components/ui/table";
import { CardContent } from "@/components/ui/card";

export function TableWrapper({ children }) {
  return (
    <CardContent className="p-0 border-none border-white">
      <Table className="border-b border-b-dialog_inside_border_color border border-dialog_inside_border_color">
        {children}
      </Table>
    </CardContent>
  );
}
