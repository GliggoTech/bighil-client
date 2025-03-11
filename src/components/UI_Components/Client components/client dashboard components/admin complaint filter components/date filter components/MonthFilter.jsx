import { getMonthOptions, getYearOptions } from "@/utils/date_filter";
import DateSelect from "./DateSelect";

const MonthFilter = ({ dateFilter, setDateFilter }) => (
  <div className="grid grid-cols-2 gap-2">
    <DateSelect
      value={dateFilter.month}
      onChange={(value) => setDateFilter({ ...dateFilter, month: value })}
      placeholder="Month"
      options={getMonthOptions()}
      anyOption={{ value: "anyMonth", label: "Any" }}
    />

    <DateSelect
      value={dateFilter.year}
      onChange={(value) => setDateFilter({ ...dateFilter, year: value })}
      placeholder="Year"
      options={getYearOptions()}
      anyOption={{ value: "anyYear", label: "Any" }}
    />
  </div>
);

export default MonthFilter;
