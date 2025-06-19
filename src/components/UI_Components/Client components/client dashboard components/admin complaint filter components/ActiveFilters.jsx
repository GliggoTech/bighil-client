import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const ActiveFilters = ({ activeFilters, onClear }) => (
  <div className="flex flex-wrap sm:items-center sm:justify-between sm:flex-row flex-col gap-4 pb-2">
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Active Filters:
      </span>
      {activeFilters.map((filter) => (
        <span
          key={filter}
          className="text-text_color bg-white shadow-md p-1  rounded-md border-dialog_inside_border_color text-sm"
        >
          {filter}
        </span>
      ))}
    </div>
    <Button
      variant="outline"
      size="sm"
      disabled={activeFilters.length === 0}
      onClick={onClear}
      className="bg-red w-fit text-white border-none"
    >
      <RefreshCw className="h-3.5 w-3.5" />
      Clear Filters
    </Button>
  </div>
);

export default ActiveFilters;
