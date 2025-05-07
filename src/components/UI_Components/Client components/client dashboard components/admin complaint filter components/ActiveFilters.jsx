import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const ActiveFilters = ({ activeFilters, onClear }) => (
  <div className="flex flex-wrap items-center justify-between gap-4 pb-2">
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Active Filters:
      </span>
      {activeFilters.map((filter) => (
        <span key={filter} className="text-text_color">
          {filter}
        </span>
      ))}
    </div>
    <Button
      variant="outline"
      size="sm"
      onClick={onClear}
      className="bg-red text-white"
    >
      <RefreshCw className="h-3.5 w-3.5" />
      Clear Filters
    </Button>
  </div>
);

export default ActiveFilters;
