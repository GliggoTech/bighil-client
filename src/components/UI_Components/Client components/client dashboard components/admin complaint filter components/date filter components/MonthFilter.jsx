import { getMonthOptions, getYearOptions } from "@/utils/date_filter";
import DateSelect from "./DateSelect";

const MonthFilter = ({ dateFilter, setDateFilter }) => {
  const handleMonthChange = (month) => {
    setDateFilter((prev) => ({
      ...prev,
      month,
      ...(month === "anyMonth" && { year: "anyYear" }), // Reset year if any month
    }));
  };
  return (
    <div className="grid grid-cols-2 gap-2">
      <DateSelect
        value={dateFilter.month}
        onChange={handleMonthChange}
        placeholder="Month"
        options={getMonthOptions()}
        anyOption={{ value: "anyMonth", label: "Any" }}
      />

      <DateSelect
        value={dateFilter.year}
        onChange={(year) => setDateFilter((prev) => ({ ...prev, year }))}
        placeholder="Year"
        options={getYearOptions()}
        anyOption={{ value: "anyYear", label: "Any" }}
      />
    </div>
  );
};

export default MonthFilter;
