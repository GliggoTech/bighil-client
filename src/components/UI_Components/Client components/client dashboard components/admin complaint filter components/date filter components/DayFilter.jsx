import {
  getDayOptions,
  getMonthOptions,
  getYearOptions,
} from "@/utils/date_filter";
import DateSelect from "./DateSelect";

const DayFilter = ({ dateFilter, setDateFilter }) => (
  <div className="grid grid-cols-3 gap-2">
    <DateSelect
      value={dateFilter.day}
      onChange={(value) => setDateFilter({ ...dateFilter, day: value })}
      placeholder="Day"
      options={getDayOptions()}
      anyOption={{ value: "allDay", label: "Any" }}
    />

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

export default DayFilter;
