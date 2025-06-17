"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Circle } from "lucide-react";
import React from "react";

const basePriorities = [
  { label: "All", value: "all", color: "text-text_color", icon: Circle },
  { label: "Low", value: "LOW", color: "text-primary", icon: Circle },
  {
    label: "Medium",
    value: "MEDIUM",
    color: "text-info",
    icon: Circle,
  },
  { label: "High", value: "HIGH", color: "text-danger", icon: Circle },
  { label: "Critical", value: "CRITICAL", color: "text-red", icon: Circle },
];
const PriorityFilter = ({ value, onChange, userRole }) => {
  const selectedPriority = basePriorities.find(
    (priority) => priority.value === value
  );
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-10 rounded-xl bg-white border border-dialog_inside_border_color">
        <div className="flex items-center gap-2 pl-3">
          {/* <SelectedIcon
            className={`w-3 h-3 ${selectedStatus?.color || "text-text_color"}`}
          /> */}
          <span
            className={`text-sm ${
              selectedPriority?.color || "text-text_color"
            }`}
          >
            {selectedPriority?.label || "Select Priority"}
          </span>
        </div>
      </SelectTrigger>
      <SelectContent className="rounded-xl border border-dialog_inside_border_color bg-white shadow-md w-full">
        {basePriorities.map(({ label, value: value, color, icon: Icon }) => (
          <SelectItem
            key={value}
            value={value}
            className={`
              cursor-pointer w-full rounded-md px-3 py-2 text-sm font-light
              flex items-center justify-start gap-2
              ${color}
              hover:bg-primary-bg-subtle hover:text-text_color transition-all
            `}
          >
            {/* <Icon className={`w-3 h-3 ${color}`} /> */}
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default PriorityFilter;
