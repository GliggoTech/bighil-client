import {
  getDayOptions,
  getMonthOptions,
  getYearOptions,
} from "@/utils/date_filter";
import DateSelect from "./DateSelect";

const DayFilter = ({ dateFilter, onChange }) => {
  const handleChange = (field, value) => {
    const newFilter = {
      ...dateFilter,
      [field]: value,
      // Reset dependent fields when changing scope
      ...(field === "year" &&
        value === "anyYear" && {
          month: "anyMonth",
          day: "allDay",
        }),
      ...(field === "month" &&
        value === "anyMonth" && {
          day: "allDay",
        }),
    };
    onChange(newFilter);
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      <DateSelect
        value={dateFilter.day}
        onChange={(v) => handleChange("day", v)}
        placeholder="Day"
        options={getDayOptions()}
        anyOption={{ value: "allDay", label: "All" }}
      />

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

export default DayFilter;
