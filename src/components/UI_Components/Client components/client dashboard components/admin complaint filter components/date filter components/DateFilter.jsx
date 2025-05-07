"use client";
import { useEffect, useRef, useState } from "react";
import DateTypeSelector from "./DateTypeSelector";
import DayFilter from "./DayFilter";
import MonthFilter from "./MonthFilter";
import YearFilter from "./YearFilter";
import { debounce } from "lodash";

const DateFilter = ({ dateFilter, setDateFilter }) => {
  const [localDateFilter, setLocalDateFilter] = useState(dateFilter);
  const debouncedSetDateFilter = useRef(debounce(setDateFilter, 500)).current;
  useEffect(() => {
    // Update parent filter after 500ms of inactivity
    debouncedSetDateFilter(localDateFilter);
  }, [localDateFilter, debouncedSetDateFilter]);

  useEffect(() => {
    // Sync local state with parent state
    setLocalDateFilter(dateFilter);
  }, [dateFilter]);

  const handleTypeChange = (type) => {
    setLocalDateFilter((prev) => ({
      ...prev,
      type,
      // Reset irrelevant fields when type changes
      ...(type !== "day" && { day: "" }),
      ...(type !== "month" && { month: "" }),
      ...(type !== "year" && { year: "" }),
    }));
  };
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
      <DateTypeSelector value={dateFilter.type} onChange={handleTypeChange} />
      {renderFilter(localDateFilter, setLocalDateFilter)}
    </div>
  );
};

export default DateFilter;
