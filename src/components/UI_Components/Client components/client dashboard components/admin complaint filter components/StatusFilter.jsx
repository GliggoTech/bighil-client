import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Circle } from "lucide-react";

const statuses = [
  { label: "All", value: "all", color: "text-text_color", icon: Circle },
  {
    label: "Pending",
    value: "Pending",
    color: "text-yellow",
    icon: Circle,
  },
  {
    label: "In Progress",
    value: "In Progress",
    color: "text-info",
    icon: Circle,
  },
  {
    label: "Unwanted",
    value: "Unwanted",
    color: "text-danger",
    icon: Circle,
  },
  {
    label: "Resolved",
    value: "Resolved",
    color: "text-success",
    icon: Circle,
  },
];

const StatusFilter = ({ value, onChange }) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger className="h-10 rounded-xl border-indigo/50">
      <SelectValue placeholder="Select status" />
    </SelectTrigger>
    <SelectContent className="rounded-xl border border-dialog_inside_border_color bg-white shadow-md w-full">
      {statuses.map(({ label, value: statusValue, color }) => (
        <SelectItem
          key={statusValue}
          value={statusValue}
          className={`
            cursor-pointer w-full rounded-md px-3 py-2 text-sm font-light
            flex items-center justify-start gap-2
            ${color}
            hover:bg-primary-bg-subtle hover:text-text_color transition-all
          `}
        >
          {label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default StatusFilter;
