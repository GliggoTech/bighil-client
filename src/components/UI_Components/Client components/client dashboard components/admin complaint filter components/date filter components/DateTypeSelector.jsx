import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const DateTypeSelector = ({ value, onChange }) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger className="h-10">
      <SelectValue placeholder="Filter by" />
    </SelectTrigger>
    <SelectContent className="z-50 bg-accent-info text-text-light">
      <SelectItem value="day" className="border-b-2">
        Specific Day
      </SelectItem>
      <SelectItem value="month" className="border-b-2">
        Month
      </SelectItem>
      <SelectItem value="year">Year</SelectItem>
    </SelectContent>
  </Select>
);

export default DateTypeSelector;
