import { getMonthOptions, getYearOptions } from "@/utils/date_filter";
import DateSelect from "./DateSelect";

const MonthFilter = ({ dateFilter, onChange }) => {
  const handleChange = (field, value) => {
    const newFilter = {
      ...dateFilter,
      [field]: value,
      ...(field === "year" && value === "anyYear" && { month: "anyMonth" }),
    };
    onChange(newFilter);
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <DateSelect
        value={dateFilter.month}
        onChange={(v) => handleChange("month", v)}
        placeholder="Month"
        options={getMonthOptions()}
        anyOption={{ value: "anyMonth", label: "Any" }}
      />

      <DateSelect
        value={dateFilter.year}
        onChange={(v) => handleChange("year", v)}
        placeholder="Year"
        options={getYearOptions()}
        anyOption={{ value: "anyYear", label: "Any" }}
      />
    </div>
  );
};

export default MonthFilter;
