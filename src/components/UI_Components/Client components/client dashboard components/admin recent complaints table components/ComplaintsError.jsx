import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export function ComplaintsError({ error }) {
  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center text-accent-danger">
          <AlertCircle className="h-12 w-12 mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            Error Loading Complaints
          </h3>
          <p className="text-text-secondary dark:text-text-muted text-center">
            {error || "An unexpected error occurred. Please try again later."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
