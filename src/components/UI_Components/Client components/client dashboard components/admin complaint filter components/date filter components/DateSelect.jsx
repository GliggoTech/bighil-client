import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DateSelect = ({ value, onChange, placeholder, options, anyOption }) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger className="h-10">
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      {anyOption && (
        <SelectItem value={anyOption.value}>{anyOption.label}</SelectItem>
      )}
      {options.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default DateSelect;
