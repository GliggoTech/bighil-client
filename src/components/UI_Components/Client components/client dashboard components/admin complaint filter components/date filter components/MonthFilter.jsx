import { getMonthOptions, getYearOptions } from "@/utils/date_filter";
import DateSelect from "./DateSelect";

const MonthFilter = ({ dateFilter, setDateFilter }) => {
  const handleChange = (field, value) => {
    const newFilter = { ...dateFilter, [field]: value };

    // Only update parent if both fields are selected
    if (
      (field === "month" && dateFilter.year) ||
      (field === "year" && dateFilter.month)
    ) {
      setDateFilter(newFilter);
    } else {
      // Update local state without triggering search
      setDateFilter((prev) => ({ ...prev, [field]: value }));
    }
  };
  return (
    <div className="grid grid-cols-2 gap-2">
      <DateSelect
        value={dateFilter.month}
        onChange={(value) => handleChange("month", value)}
        placeholder="Month"
        options={getMonthOptions()}
        anyOption={{ value: "anyMonth", label: "Any" }}
      />

      <DateSelect
        value={dateFilter.year}
        onChange={(value) => handleChange("year", value)}
        placeholder="Year"
        options={getYearOptions()}
        anyOption={{ value: "anyYear", label: "Any" }}
      />
    </div>
  );
};

export default MonthFilter;
