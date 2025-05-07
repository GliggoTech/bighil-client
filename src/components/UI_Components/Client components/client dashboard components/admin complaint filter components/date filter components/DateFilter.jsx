"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import DateTypeSelector from "./DateTypeSelector";
import DayFilter from "./DayFilter";
import MonthFilter from "./MonthFilter";
import YearFilter from "./YearFilter";
import { debounce } from "lodash";

const DateFilter = ({ dateFilter, setDateFilter }) => {
  console.log("DateFilter rendered", dateFilter);
  const [localDateFilter, setLocalDateFilter] = useState(dateFilter);
  const debouncedSetDateFilter = useRef(debounce(setDateFilter, 500)).current;
  // Add validation state
  const [isValid, setIsValid] = useState(false);

  const validateDateSelection = (currentFilter) => {
    switch (currentFilter.type) {
      case "day":
        return (
          !!currentFilter.day && !!currentFilter.month && !!currentFilter.year
        );
      case "month":
        return !!currentFilter.month && !!currentFilter.year;
      case "year":
        return !!currentFilter.year;
      default:
        return false;
    }
  };

  useEffect(() => {
    const isValid = validateDateSelection(localDateFilter);
    setIsValid(isValid);

    if (isValid) {
      debouncedSetDateFilter(localDateFilter);
    }
  }, [localDateFilter, debouncedSetDateFilter, validateDateSelection]);

  useEffect(() => {
    // Sync local state with parent state
    setLocalDateFilter(dateFilter);
  }, [dateFilter, setDateFilter]);

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
    switch (
      localDateFilter.type // Change from dateFilter.type to localDateFilter.type
    ) {
      case "day":
        return (
          <DayFilter
            dateFilter={localDateFilter}
            setDateFilter={setLocalDateFilter}
          />
        );
      case "month":
        return (
          <MonthFilter
            dateFilter={localDateFilter}
            setDateFilter={setLocalDateFilter}
          />
        );
      case "year":
        return (
          <YearFilter
            dateFilter={localDateFilter}
            setDateFilter={setLocalDateFilter}
          />
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
