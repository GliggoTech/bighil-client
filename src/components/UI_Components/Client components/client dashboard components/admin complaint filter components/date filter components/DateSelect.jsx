import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DateSelect = ({ value, onChange, placeholder, options, anyOption }) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger className="h-10 border-success/50">
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent className="z-50 bg-white  border-none text-text_color">
      {anyOption && (
        <SelectItem
          className={`
          cursor-pointer w-full rounded-md px-3 py-2 text-sm font-light
          flex items-center justify-start gap-2
      
          hover:bg-primary-bg-subtle hover:text-text_color transition-all
        `}
          value={anyOption.value}
        >
          {anyOption.label}
        </SelectItem>
      )}
      {options.map((option) => (
        <SelectItem
          className={`
          cursor-pointer w-full rounded-md px-3 py-2 text-sm font-light
          flex items-center justify-start gap-2
       
          hover:bg-primary-bg-subtle hover:text-text_color transition-all
        `}
          key={option.value}
          value={option.value}
        >
          {option.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default DateSelect;
