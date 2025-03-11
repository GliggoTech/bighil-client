import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StatusFilter = ({ value, onChange }) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger className="h-10">
      <SelectValue placeholder="Select status" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="all">All </SelectItem>
      <SelectItem value="Pending">Pending</SelectItem>
      <SelectItem value="In Progress">In Progress</SelectItem>
      <SelectItem value="Unwanted">Unwanted</SelectItem>
      <SelectItem value="Resolved">Resolved</SelectItem>
    </SelectContent>
  </Select>
);

export default StatusFilter;
