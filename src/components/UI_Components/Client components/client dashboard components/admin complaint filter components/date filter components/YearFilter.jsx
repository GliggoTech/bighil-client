import { getYearOptions } from "@/utils/date_filter";
import DateSelect from "./DateSelect";

const YearFilter = ({ dateFilter, setDateFilter }) => (
  <DateSelect
    value={dateFilter.year}
    onChange={(year) => setDateFilter((prev) => ({ ...prev, year }))}
    placeholder="Year"
    options={getYearOptions()}
    anyOption={{ value: "anyYear", label: "Any" }}
  />
);

export default YearFilter;
