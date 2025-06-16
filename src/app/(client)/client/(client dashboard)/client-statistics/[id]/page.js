import { BarChart3 } from "lucide-react";

export default function Client_Statistics_Page() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary">
          <BarChart3 className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-text_color dark:text-text-light">
            Client Statistics Dashboard
          </h1>
          <p className="text-sm text-secondary dark:text-text-secondary">
            Comprehensive analytics and insights
          </p>
        </div>
      </div>
    </div>
  );
}
