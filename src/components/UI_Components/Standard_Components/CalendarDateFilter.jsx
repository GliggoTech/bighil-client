"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { DayPicker } from "react-day-picker"; // Import DayPicker
import { Button } from "@/components/ui/button";
import { format, parseISO, isValid } from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  dateObjectToStringDate,
  stringDateToDateObject,
} from "@/utils/dateFilterUtils";
import { Calendar } from "@/components/ui/calendar";

// Custom Year Grid Component (Keep your existing component)
const YearGrid = ({
  selectedYear,
  onYearSelect,
  fromYear = 2020,
  toYear = new Date().getFullYear() + 10,
}) => {
  // Adjusted default years
  const years = Array.from(
    { length: toYear - fromYear + 1 },
    (_, i) => fromYear + i
  );

  // Arrange years into a grid-friendly format (e.g., rows of 3)
  const yearRows = [];
  for (let i = 0; i < years.length; i += 3) {
    yearRows.push(years.slice(i, i + 3));
  }

  return (
    <div className="p-2">
      {yearRows.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-3 gap-2 mb-2">
          {row.map((year) => (
            <Button
              key={year}
              variant={year === selectedYear ? "default" : "outline"}
              className="h-9"
              onClick={() => onYearSelect(year)}
            >
              {year}
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
};

// Custom Month Grid Component (Keep your existing component)
const MonthGrid = ({ selectedMonth, onMonthSelect }) => {
  const months = Array.from({ length: 12 }, (_, i) => i + 1); // 1-12

  // Arrange months into rows of 3
  const monthRows = [];
  for (let i = 0; i < months.length; i += 3) {
    monthRows.push(months.slice(i, i + 3));
  }

  return (
    <div className="p-2">
      {monthRows.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-3 gap-2 mb-2">
          {row.map((month) => {
            const monthDate = new Date(2023, month - 1); // Arbitrary year for formatting
            return (
              <Button
                key={month}
                variant={month === selectedMonth ? "default" : "outline"}
                className="h-9"
                onClick={() => onMonthSelect(month)}
              >
                {format(monthDate, "MMM")}
              </Button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

// Custom Caption Component to handle navigation and view switching
const CustomCaption = ({
  currentDate,
  viewMode,
  setViewMode,
  setCurrentDate,
}) => {
  const displayYear = currentDate?.getFullYear() || new Date().getFullYear();
  const displayMonthYear = currentDate || new Date(); // Use full date for formatting

  // Navigation handlers for changing the displayed date (year or month)
  const handlePrev = () => {
    const newDate = new Date(currentDate || new Date());
    if (viewMode === "year") {
      newDate.setFullYear(newDate.getFullYear() - 10); // Navigate by decade in year view? Or single year? Let's do single year for simplicity.
      newDate.setFullYear(newDate.getFullYear() - 1); // Navigate by year
    } else {
      // month or day view
      newDate.setMonth(newDate.getMonth() - 1); // Navigate by month
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate || new Date());
    if (viewMode === "year") {
      newDate.setFullYear(newDate.getFullYear() + 1); // Navigate by year
    } else {
      // month or day view
      newDate.setMonth(newDate.getMonth() + 1); // Navigate by month
    }
    setCurrentDate(newDate);
  };

  // Determine text to display based on viewMode
  let captionText = "";
  let showYearButton = false;
  let showMonthButton = false;
  let showMonthYearText = false;

  if (viewMode === "year") {
    captionText = displayYear.toString();
    // Navigation is by year
  } else if (viewMode === "month") {
    captionText = displayYear.toString(); // Show year in month view caption
    showYearButton = true; // Can click year to go to year view
    // Navigation is by year
  } else {
    // viewMode === 'day'
    captionText = format(displayMonthYear, "MMMM yyyy");
    showYearButton = true; // Can click year to go to year view
    showMonthButton = true; // Can click month to go to month view
    showMonthYearText = true; // Show the full month/year text
    // Navigation is by month
  }

  return (
    <div className="flex items-center justify-between px-2 py-2">
      {/* Prev Button: Shows for all views, navigates year/month based on viewMode */}
      <Button variant="default" size="sm" onClick={handlePrev}>
        <span>
          <ChevronLeft size={18} className=" text-white" />
        </span>
      </Button>

      <div className="space-x-1">
        {/* Conditional Buttons/Text based on viewMode */}
        {viewMode === "year" && (
          <span className="font-semibold text-gray-800">{displayYear}</span> // Just show year text
        )}

        {viewMode === "month" && (
          // In month view, show the year, clickable to go to year view
          <Button
            variant="default"
            size="sm"
            onClick={() => setViewMode("year")}
          >
            <span className="font-semibold text-white">{displayYear}</span>
          </Button>
        )}

        {viewMode === "day" && (
          <>
            {/* In day view, show month and year, clickable */}
            <Button
              variant="default"
              size="sm"
              onClick={() => setViewMode("month")}
            >
              <span className="font-semibold text-white">
                {format(displayMonthYear, "MMMM")}
              </span>
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => setViewMode("year")}
            >
              <span className="font-semibold text-white">{displayYear}</span>
            </Button>
          </>
        )}
      </div>

      {/* Next Button: Shows for all views, navigates year/month based on viewMode */}
      <Button variant="default" size="sm" onClick={handleNext}>
        <span>
          <ChevronRight size={18} className=" text-white" />
        </span>
      </Button>
    </div>
  );
};

const CalendarDateFilter = ({ dateFilter, setDateFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  // viewMode controls WHICH grid is currently displayed ('day', 'month', 'year')
  const [viewMode, setViewMode] = useState(dateFilter.type);

  const [tempDate, setTempDate] = useState(
    () => stringDateToDateObject(dateFilter) || new Date() // Default to current date if initial filter is invalid/empty
  );

  // Effect to sync internal state (tempDate, viewMode) when parent dateFilter changes
  useEffect(() => {
    const newDate = stringDateToDateObject(dateFilter);
    // Update tempDate only if the date object is valid
    setTempDate(newDate || new Date()); // Default to current date if newDate is invalid

    // Always update viewMode to match the parent filter type when dateFilter changes
    setViewMode(dateFilter.type);
  }, [dateFilter]); // Depend on the entire dateFilter object

  // Function to finalize the selection and update parent state
  const handleFinalizeSelection = useCallback(
    (date, selectedUnitType) => {
      // Convert the selected date object to the state format *based on the parent's type*
      const newDateFilterState = dateObjectToStringDate(date, dateFilter.type);

      // Check if the relevant part of the date filter state actually changed
      // This prevents unnecessary updates if the user re-selects the same value
      let hasRelevantChange = false;
      switch (dateFilter.type) {
        case "day":
          hasRelevantChange =
            newDateFilterState.day !== dateFilter.day ||
            newDateFilterState.month !== dateFilter.month ||
            newDateFilterState.year !== dateFilter.year;
          break;
        case "month":
          hasRelevantChange =
            newDateFilterState.month !== dateFilter.month ||
            newDateFilterState.year !== dateFilter.year;
          break;
        case "year":
          hasRelevantChange = newDateFilterState.year !== dateFilter.year;
          break;
        default:
          hasRelevantChange = false; // No known type
          break;
      }

      if (hasRelevantChange) {
        setDateFilter(newDateFilterState); // Update the parent state
        setIsOpen(false); // Close the popover
      }
    },
    [
      setDateFilter,
      dateFilter.type,
      dateFilter.day,
      dateFilter.month,
      dateFilter.year,
    ] // Include relevant parts of dateFilter in dependencies
  );

  // Selection handler for YearGrid
  const handleYearSelect = useCallback(
    (year) => {
      // Create a date object for Jan 1st of the selected year, keeping current month/day if possible for potential later views
      const newDate = new Date(
        year,
        tempDate?.getMonth() || 0,
        tempDate?.getDate() || 1
      );
      setTempDate(newDate); // Update the displayed date/focus

      if (dateFilter.type === "year") {
        // If parent filter type is 'year', finalize the selection
        handleFinalizeSelection(newDate, "year");
      } else {
        // If parent type is month or day, transition to month view
        setViewMode("month");
      }
    },
    [tempDate, dateFilter.type, handleFinalizeSelection]
  ); // Add handleFinalizeSelection to dependencies

  // Selection handler for MonthGrid
  const handleMonthSelect = useCallback(
    (month) => {
      // Create a date object for the 1st of the selected month, keeping current year/day if possible
      const currentYear = tempDate?.getFullYear() || new Date().getFullYear();
      const newDate = new Date(
        currentYear,
        month - 1,
        tempDate?.getDate() || 1
      ); // month is 1-indexed, convert to 0-indexed
      setTempDate(newDate); // Update the displayed date/focus

      if (dateFilter.type === "month") {
        // If parent filter type is 'month', finalize the selection
        handleFinalizeSelection(newDate, "month");
      } else {
        // If parent type is day, transition to day view
        setViewMode("day");
      }
    },
    [tempDate, dateFilter.type, handleFinalizeSelection]
  ); // Add handleFinalizeSelection to dependencies

  // Selection handler for DayPicker (only used when viewMode is 'day')
  const handleDaySelect = useCallback(
    (date) => {
      if (!date) {
        return;
      }

      setTempDate(date); // Update the displayed date/focus

      if (dateFilter.type === "day") {
        // If parent filter type is 'day', finalize the selection
        handleFinalizeSelection(date, "day");
      }
    },
    [dateFilter.type, handleFinalizeSelection]
  ); // Add handleFinalizeSelection to dependencies

  // Helper to format the display text on the trigger button
  const getDisplayText = useMemo(() => {
    const { type, day, month, year } = dateFilter;

    // Check if any date part relevant to the type is selected
    const isDateSelected =
      (type === "day" && day && month && year) ||
      (type === "month" && month && year) ||
      (type === "year" && year);

    if (!isDateSelected) {
      if (type === "day") {
        return "Pick a date";
      }
      if (type === "month") {
        return "Pick a month";
      }
      if (type === "year") {
        return "Pick a year";
      }
    }

    // Convert the relevant state parts back to a Date object for formatting
    const dateObj = stringDateToDateObject(dateFilter);

    if (!dateObj) {
      // Fallback for invalid date in state
      return "Invalid Date";
    }

    try {
      switch (type) {
        case "day":
          return format(dateObj, "PPP"); // e.g., October 26th, 2023
        case "month":
          return format(dateObj, "MMMM yyyy"); // e.g., October 2023
        case "year":
          return format(dateObj, "yyyy"); // e.g., 2023
        default:
          return "Pick a date";
      }
    } catch (e) {
      console.error("Error formatting display date:", e);
      return "Error formatting date";
    }
  }, [dateFilter]); // Depend on dateFilter state

  // Handle clearing the date filter
  const handleClearDate = useCallback(() => {
    // Reset tempDate and parent dateFilter state
    setTempDate(new Date()); // Reset internal display to current date
    setDateFilter({
      type: dateFilter.type, // Keep the current type
      day: "",
      month: "",
      year: "", // Clear values
    });
    setViewMode(dateFilter.type); // Reset view mode to the parent's filter type
    setIsOpen(false); // Close the popover
  }, [setDateFilter, dateFilter.type]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        {/* Use a Button as the trigger */}
        <Button
          variant={"outline"}
          className={`w-full justify-start text-left  rounded-md border-success/50
               ${
                 !getDisplayText ||
                 getDisplayText === "Pick a date" ||
                 getDisplayText === "Invalid Date"
                   ? "text-muted-foreground"
                   : ""
               }
               transition-shadow duration-200
               bg-white/90 focus:bg-white ring-1 ring-success-border-subtle focus:ring-2 focus:ring-success
               flex items-center gap-2
           `}
        >
          <CalendarIcon className="h-4 w-4 text-primary" />
          {getDisplayText}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="border-none w-[280px] p-0 flex flex-col z-[1000] bg-white"
        align="start"
      >
        {/* Custom Caption for Navigation and View Switching */}
        <CustomCaption
          currentDate={tempDate}
          viewMode={viewMode}
          setViewMode={setViewMode}
          setCurrentDate={setTempDate}
        />

        {/* Conditionally Render Grids based on viewMode */}
        {viewMode === "day" && (
          <Calendar
            mode="single" // Allow single date selection
            selected={tempDate} // Highlight the tempDate
            onSelect={handleDaySelect} // Handle day selection
            month={tempDate || new Date()} // Control the displayed month
            className="text-center"
            classNames={{
              nav_button: "text-gray-600 hover:text-primary ", // Adds nav arrow styling
              // nav: "flex items-center justify-between px-3 py-2 block", // Month nav bar styling
              day_selected: "bg-primary text-white hover:bg-primary/90",
              day_today: "border border-primary text-primary",
              nav_button_previous: "absolute left-0 hidden",
              nav_button_next: "absolute right-0 hidden",
            }}
          />
        )}

        {viewMode === "month" && (
          <MonthGrid
            selectedMonth={tempDate?.getMonth() + 1} // Pass 1-indexed month
            onMonthSelect={handleMonthSelect} // Handle month selection
          />
        )}

        {viewMode === "year" && (
          <YearGrid
            selectedYear={tempDate?.getFullYear()} // Pass selected year
            onYearSelect={handleYearSelect} // Handle year selection
          />
        )}

        {/* Add a clear button */}
        {/* Show clear button if any date part relevant to the type is set in parent state */}
        {(dateFilter.type === "day" && dateFilter.day) ||
        (dateFilter.type === "month" && dateFilter.month) ||
        (dateFilter.type === "year" && dateFilter.year) ? (
          <div className="p-2 pt-0">
            {" "}
            {/* pt-0 to reduce space if grids have padding */}
            <Button
              variant="outline"
              className="w-full"
              onClick={handleClearDate}
            >
              Clear Date
            </Button>
          </div>
        ) : null}
      </PopoverContent>
    </Popover>
  );
};

export default CalendarDateFilter;
