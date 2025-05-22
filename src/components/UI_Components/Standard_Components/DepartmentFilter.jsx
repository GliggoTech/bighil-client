import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { officeDepartments } from "@/lib/complaintSchema";
import React from "react";

const DepartmentFilter = ({ value, onChange }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-10 rounded-xl bg-white border border-dialog_inside_border_color">
        <div className="flex items-center gap-2 pl-3">
          <span className={`text-sm text-text_color`}>
            {value || "Select department"}
          </span>
        </div>
      </SelectTrigger>
      <SelectContent className="rounded-xl border border-dialog_inside_border_color bg-white shadow-md w-full">
        {officeDepartments.map(({ label, value }) => (
          <SelectItem
            key={value}
            value={value}
            className={`
              cursor-pointer w-full rounded-md px-3 py-2 text-sm font-light
              flex items-center justify-start gap-2
          
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

export default DepartmentFilter;
