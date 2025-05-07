import { Input } from "@/components/ui/input";

const TextFilter = ({ value, onChange, placeholder, Icon, className }) => (
  <div className={`relative ${className}`}>
    <Input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="pl-9 h-10 rounded-xl border-none"
      onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
    />
    <Icon className="h-4 w-4 absolute left-3 top-3 text-text_color" />
  </div>
);

export default TextFilter;
