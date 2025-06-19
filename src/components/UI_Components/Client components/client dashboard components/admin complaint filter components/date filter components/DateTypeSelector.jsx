import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const DateTypeSelector = ({ value, onChange }) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger className="h-10 border-success/50 bg-white">
      <SelectValue placeholder="Filter by" />
    </SelectTrigger>
    <SelectContent className="z-50 bg-white text-text-light border-none text-text_color">
      <SelectItem
        value="day"
        className={`
            cursor-pointer w-full rounded-md px-3 py-2 text-sm font-light
            flex items-center justify-start gap-2
          bg-white
            hover:bg-white hover:text-text_color transition-all
          `}
      >
        Specific Day
      </SelectItem>
      <SelectItem
        value="week"
        className={`
            cursor-pointer w-full rounded-md px-3 py-2 text-sm font-light
            flex items-center justify-start gap-2
          bg-white
            hover:bg-white hover:text-text_color transition-all
          `}
      >
       This Week
      </SelectItem>
      <SelectItem
        value="month"
        className={`
            cursor-pointer w-full rounded-md px-3 py-2 text-sm font-light
            flex items-center justify-start gap-2
          bg-white
            hover:bg-white hover:text-text_color transition-all
          `}
      >
        Month
      </SelectItem>
      <SelectItem
        value="year"
        className={`
            cursor-pointer w-full rounded-md px-3 py-2 text-sm font-light
            flex items-center justify-start gap-2
        bg-white
            hover:bg-white hover:text-text_color transition-all
          `}
      >
        Year
      </SelectItem>
    </SelectContent>
  </Select>
);

export default DateTypeSelector;
