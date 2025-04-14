import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, Circle } from "lucide-react";

const statuses = [
  { label: "All", value: "all", color: "text-text-primary", icon: Circle },
  {
    label: "Pending",
    value: "Pending",
    color: "text-accent-warning",
    icon: Circle,
  },
  {
    label: "In Progress",
    value: "In Progress",
    color: "text-accent-info",
    icon: Circle,
  },
  {
    label: "Unwanted",
    value: "Unwanted",
    color: "text-accent-danger",
    icon: Circle,
  },
  {
    label: "Resolved",
    value: "Resolved",
    color: "text-accent-success",
    icon: Circle,
  },
];

const StatusFilter = ({ value, onChange }) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger className="h-10 rounded-xl border border-border-medium bg-background-secondary text-text-primary shadow-sm transition-all hover:border-primary hover:bg-primary-light hover:text-white focus:ring-2 focus:ring-primary">
      <SelectValue placeholder="Select status" />
    </SelectTrigger>
    <SelectContent className="rounded-xl border border-border-light bg-surface-light shadow-md animate-in fade-in-10 duration-200">
      {statuses.map(({ label, value: statusValue, color, icon: Icon }) => (
        <SelectItem
          key={statusValue}
          value={statusValue}
          className={`group flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium ${color} hover:bg-background-tertiary hover:text-text-primary transition-all border-b border-border-light last:border-0`}
        >
          <div className="flex items-center space-x-2">
            <Icon className={`w-3.5 h-3.5 ${color}`} />
            <span>{label}</span>
          </div>
          {value === statusValue && (
            <Check className="w-4 h-4 text-primary opacity-100 transition-opacity" />
          )}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default StatusFilter;
