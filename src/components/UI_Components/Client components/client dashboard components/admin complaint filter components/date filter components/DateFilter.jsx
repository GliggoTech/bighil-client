"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import DateTypeSelector from "./DateTypeSelector";
import DayFilter from "./DayFilter";
import MonthFilter from "./MonthFilter";
import YearFilter from "./YearFilter";

const DateFilter = ({ dateFilter, setDateFilter }) => {
  const [localDateFilter, setLocalDateFilter] = useState(dateFilter);
  const initialRender = useRef(true);

  // Sync with parent state
  useEffect(() => {
    if (!initialRender.current) return;
    initialRender.current = false;
    setLocalDateFilter(dateFilter);
  }, [dateFilter]);

  // Handle filter changes immediately
  const handleFilterUpdate = useCallback(
    (newFilter) => {
      setLocalDateFilter(newFilter);
      setDateFilter(newFilter);
    },
    [setDateFilter]
  );

  const handleTypeChange = (type) => {
    const newFilter = {
      type,
      day: type === "day" ? localDateFilter.day : "",
      month: type === "day" || type === "month" ? localDateFilter.month : "",
      year: localDateFilter.year,
    };
    handleFilterUpdate(newFilter);
  };

  const renderFilter = () => {
    switch (localDateFilter.type) {
      case "day":
        return (
          <DayFilter
            dateFilter={localDateFilter}
            onChange={handleFilterUpdate}
          />
        );
      case "month":
        return (
          <MonthFilter
            dateFilter={localDateFilter}
            onChange={handleFilterUpdate}
          />
        );
      case "year":
        return (
          <YearFilter
            dateFilter={localDateFilter}
            onChange={handleFilterUpdate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-3">
      <DateTypeSelector
        value={localDateFilter.type}
        onChange={handleTypeChange}
      />
      {renderFilter()}
    </div>
  );
};

export default DateFilter;
