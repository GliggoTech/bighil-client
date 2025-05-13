import { CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ScrollText } from "lucide-react";

export function ComplaintsHeader() {
  return (
    <CardHeader className="bg-white dark:border-border-dark !border-b-[2px] !border-dialog_inside_border_color dark:!border-b-gray-700">
      <div className="flex items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2 font-semibold text-text_color dark:text-text-light">
          <ScrollText className="text-primary w-6 h-6  " /> Recent Complaints
        </CardTitle>

        <Button
          className="relative z-10 px-4 py-2 text-sm font-medium text-white bg-blue hover:bg-blue/90 transition-colors"
          asChild
        >
          <Link href="/client/client-complaints">View All</Link>
        </Button>
      </div>
    </CardHeader>
  );
}
