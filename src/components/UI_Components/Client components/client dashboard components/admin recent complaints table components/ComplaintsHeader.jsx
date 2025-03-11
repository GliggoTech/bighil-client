import { CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ScrollText } from "lucide-react";

export function ComplaintsHeader() {
  return (
    <CardHeader className="bg-gradient-to-r from-background-secondary to-background-tertiary border-b border-border-light dark:border-border-dark">
      <div className="flex items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2 font-semibold text-text-primary dark:text-text-light">
          <ScrollText className="text-accent-info w-6 h-6  " /> Recent
          Complaints
        </CardTitle>
        {/* <Link href="/client/client-complaints" asChild>
          <Button
            variant="outline"
            size="sm"
            className="text-xs bg-surface-light dark:bg-surface-dark hover:bg-primary hover:text-white dark:hover:bg-background-dark"
          >
            View All
          </Button>
        </Link> */}
        <Button
          variant="outline"
          size="sm"
          className="text-xs bg-surface-light dark:bg-surface-dark hover:bg-primary hover:text-white dark:hover:bg-background-dark"
          asChild
        >
          <Link href="/client/client-complaints">View All</Link>
        </Button>
      </div>
    </CardHeader>
  );
}
