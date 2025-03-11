import DateTypeSelector from "./DateTypeSelector";
import DayFilter from "./DayFilter";
import MonthFilter from "./MonthFilter";
import YearFilter from "./YearFilter";

const DateFilter = ({ dateFilter, setDateFilter }) => {
  const renderFilter = () => {
    switch (dateFilter.type) {
      case "day":
        return (
          <DayFilter dateFilter={dateFilter} setDateFilter={setDateFilter} />
        );
      case "month":
        return (
          <MonthFilter dateFilter={dateFilter} setDateFilter={setDateFilter} />
        );
      case "year":
        return (
          <YearFilter dateFilter={dateFilter} setDateFilter={setDateFilter} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-3">
      <DateTypeSelector
        value={dateFilter.type}
        onChange={(type) => setDateFilter({ ...dateFilter, type })}
      />
      {renderFilter()}
    </div>
  );
};

export default DateFilter;
