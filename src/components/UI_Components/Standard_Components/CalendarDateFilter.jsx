"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, parseISO, isValid } from "date-fns"; // Import isValid
import { CalendarIcon } from "lucide-react";

// Helper to convert state string date (e.g., "2023", "10", "26") to a Date object
// Helper to convert state string date (e.g., "2023", "10", "26") to a Date object
const stringDateToDateObject = (dateFilter) => {
  const { type, day, month, year } = dateFilter;
  console.log("stringDateToDateObject called with dateFilter:", dateFilter); // Keep for debugging if needed

  //   Year is the minimum requirement for a valid date object for any type filter
  if (!year || year === "anyYear") {
    return undefined; // Cannot create a valid Date object without a year
  }

  const y = parseInt(year, 10);
  console.log(y);
  if (isNaN(y)) {
    console.warn("stringDateToDateObject: Invalid year parsed:", year);
    return undefined;
  }

  let date;
  try {
    switch (type) {
      case "day":
        // For 'day' type, we need day, month, and year to represent a specific day.
        // If any are missing, we return undefined as no specific day is selected.
        if (day && day !== "allDay" && month && month !== "anyMonth") {
          const m = parseInt(month, 10) - 1; // 0-indexed month for Date constructor
          const d = parseInt(day, 10);

          // Basic validation for month and day numbers
          if (isNaN(m) || m < 0 || m > 11 || isNaN(d)) {
            // console.warn(`stringDateToDateObject: Invalid month (\${month}) or day (\${day}) for day type.`);
            return undefined;
          }
          // Construct date in local time. Mongoose/backend will convert to UTC.
          date = new Date(y, m, d);
        } else {
          // console.log(`stringDateToDateObject: Missing day or month for type 'day'. Returning undefined.`);
          return undefined; // Not enough info for a specific day
        }
        break;

      case "month":
        // For 'month' type, we need month and year to represent a specific month.
        if (month && month !== "anyMonth") {
          const m = parseInt(month, 10) - 1; // 0-indexed month

          if (isNaN(m) || m < 0 || m > 11) {
            // console.warn(`stringDateToDateObject: Invalid month (\${month}) for month type.`);
            return undefined;
          }
          // Construct date for the 1st day of the month in local time
          date = new Date(y, m, 1);
        } else {
          // If type is 'month' but only year is selected (month is empty),
          // provide a default date (Jan 1st) so calendar can focus on the year.
          // console.log(`stringDateToDateObject: Month is empty for type 'month'. Defaulting to Jan 1st of year \${year}.`);
          date = new Date(y, 0, 1); // Jan 1st in local time
        }
        break;

      case "year":
        // For 'year' type, we only need year.
        // Provide a default date (Jan 1st) so calendar can focus on the year.
        // console.log(`stringDateToDateObject: Type is 'year'. Defaulting to Jan 1st of year \${year}.`);
        date = new Date(y, 0, 1); // Jan 1st in local time
        break;

      default:
        // console.log(`stringDateToDateObject: Unknown type '\${type}'. Returning undefined.`);
        return undefined; // Should not happen if type is controlled
    }

    // Final check: ensure the created date object is valid
    // isValid checks if the date components result in a real date (e.g., not Feb 30)
    return isValid(date) ? date : undefined;
  } catch (e) {
    console.error("Error creating date object in stringDateToDateObject:", e);
    return undefined;
  }
};

// Helper to convert a Date object to the state string date format
const dateObjectToStringDate = (date, currentType) => {
  // If date is null/undefined (e.g., clear selection), reset state based on current type
  if (!date || !isValid(date)) {
    switch (currentType) {
      case "day":
        return { type: currentType, day: "", month: "", year: "" };
      case "month":
        return { type: currentType, day: "", month: "", year: "" }; // Day is irrelevant for month/year type state
      case "year":
        return { type: currentType, day: "", month: "", year: "" }; // Day/Month irrelevant for year type state
      default:
        return { type: "day", day: "", month: "", year: "" }; // Default type if somehow missing
    }
  }

  try {
    // Extract date parts (month is 0-indexed in JS Date, but format gives 1-12)
    const year = format(date, "yyyy");
    const month = format(date, "M"); // Get month as 1-12
    const day = format(date, "d"); // Get day as 1-31

    // Populate state based on the current filter type
    switch (currentType) {
      case "day":
        return { type: currentType, day: day, month: month, year: year };
      case "month":
        return { type: currentType, day: "", month: month, year: year }; // Clear day for month type
      case "year":
        return { type: currentType, day: "", month: "", year: year }; // Clear day and month for year type
      default:
        return { type: "day", day: "", month: "", year: year }; // Default
    }
  } catch (e) {
    console.error("Error formatting date object:", e);
    // Return empty state on error
    switch (currentType) {
      case "day":
        return { type: currentType, day: "", month: "", year: "" };
      case "month":
        return { type: currentType, day: "", month: "", year: "" };
      case "year":
        return { type: currentType, day: "", month: "", year: "" };
      default:
        return { type: "day", day: "", month: "", year: "" };
    }
  }
};

const CalendarDateFilter = ({ dateFilter, setDateFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  // Internal state for the Calendar component, uses Date object or undefined/null
  const [selectedDate, setSelectedDate] = useState(() =>
    stringDateToDateObject(dateFilter)
  );

  useEffect(() => {
    console.log("Parent dateFilter changed:", dateFilter);
    const newDateObject = stringDateToDateObject(dateFilter);
    console.log("Converted to selectedDate object:", newDateObject);
    // Use getTime() for reliable date object comparison, handle undefined/null
    if (
      (selectedDate &&
        newDateObject &&
        selectedDate.getTime() !== newDateObject.getTime()) ||
      (!selectedDate && newDateObject) ||
      (selectedDate && !newDateObject)
    ) {
      console.log("Updating internal selectedDate state from parent prop.");
      setSelectedDate(newDateObject);
    } else {
      console.log(
        "Internal selectedDate state is already in sync or no relevant change."
      );
    }
  }, [dateFilter, selectedDate]); // Depend on the dateFilter object and selectedDate for comparison

  const handleCalendarSelect = useCallback(
    (date) => {
      console.log("onSelect triggered. Raw date object from calendar:", date); // <-- LOG 1: What did react-day-picker return?
      setSelectedDate(date); // Update internal state immediately
      // Convert the Date object to the parent's string format based on the current filter type
      const newDateFilterState = dateObjectToStringDate(date, dateFilter.type);
      console.log("Converted to newDateFilterState:", newDateFilterState); // <-- LOG 2: What state will be sent to parent?
      // Only update parent state if the date filter values relevant to the type actually changed.
      // This prevents unnecessary renders/searches if the user clicks the same date/month/year again.
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
      }
      console.log("Has relevant change?", hasRelevantChange); // <-- LOG 3: Will parent state be updated?
      if (hasRelevantChange) {
        console.log("Updating parent dateFilter state.");
        setDateFilter(newDateFilterState);
      }
      // Close popover after a selection is made that updates the parent state
      // Only close if a date was selected AND it caused a state change
      if (date !== undefined && hasRelevantChange) {
        console.log(`Closing popover for type: \${dateFilter.type}`);
        setIsOpen(false);
      } else if (date === undefined) {
        console.log("Date selection cleared.");
        // If date is undefined (cleared), handleClearDate is called separately.
        // The popover should close in handleClearDate.
      } else {
        console.log(
          "Date selected, but no relevant change in parent state. Popover stays open."
        );
        // If date selected but no relevant change (e.g., clicking the same month again),
        // the popover stays open, allowing further interaction or clearing.
      }
    },
    [
      setDateFilter,
      dateFilter.type,
      dateFilter.day,
      dateFilter.month,
      dateFilter.year,
    ]
  ); // Depend on relevant state parts

  // In handleClearDate:
  const handleClearDate = useCallback(() => {
    console.log("Clearing date filter."); // <-- Log clear action
    setSelectedDate(undefined); // Clear internal state
    // Reset the date parts in the parent state
    setDateFilter({
      type: dateFilter.type, // Keep the current type
      day: "",
      month: "",
      year: "",
    });
    setIsOpen(false); // Close the popover
  }, [setDateFilter, dateFilter.type]);

  // Helper to format the display text on the trigger button
  const getDisplayText = useMemo(() => {
    const { type, day, month, year } = dateFilter;

    // Check if any date part relevant to the type is selected
    const isDateSelected =
      (type === "day" && day && month && year) ||
      (type === "month" && month && year) ||
      (type === "year" && year);

    if (!isDateSelected) {
      return "Pick a date";
    }

    // Convert the relevant state parts back to a Date object for formatting
    const dateObj = stringDateToDateObject(dateFilter);

    if (!dateObj) {
      // This case should ideally not happen if isDateSelected is true, but as a fallback
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

  // Determine the view and options for the Calendar based on the filter type
  const calendarProps = useMemo(() => {
    const baseProps = {
      mode: "single",
      selected: selectedDate,
      onSelect: handleCalendarSelect,
      initialFocus: true,
      // Restrict year navigation if needed (optional)
      // fromYear={1900}
      // toYear={new Date().getFullYear()}
    };

    switch (dateFilter.type) {
      case "year":
        return {
          ...baseProps,
          views: ["year"], // Only show year view
          captionLayout: "dropdown-buttons", // Helps navigate years
          // Set initial focus month/year if a date is selected
          defaultMonth: selectedDate || new Date(),
        };
      case "month":
        return {
          ...baseProps,
          views: ["month", "year"], // Show month and year views
          captionLayout: "dropdown-buttons", // Helps navigate months/years
          // Set initial focus month/year if a date is selected
          defaultMonth: selectedDate || new Date(),
        };
      case "day":
      default: // Default to day view
        return {
          ...baseProps,
          views: ["day", "month", "year"], // Standard calendar views
          captionLayout: "buttons", // Standard month/year navigation buttons
          // Set initial focus month/year if a date is selected
          defaultMonth: selectedDate || new Date(),
        };
    }
  }, [dateFilter.type, selectedDate, handleCalendarSelect]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        {/* Use a Button as the trigger */}
        <Button
          variant={"outline"}
          className={`w-full justify-start text-left font-normal rounded-xl border-success/50
               ${!selectedDate ? "text-muted-foreground" : ""}
               transition-shadow duration-200
               bg-white/90 focus:bg-white ring-1 ring-success-border-subtle focus:ring-2 focus:ring-success
               flex items-center gap-2 {/* Add flex and gap for icon and text */}
           `}
        >
          <CalendarIcon className="h-4 w-4" />
          {getDisplayText}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-[1000] bg-white" align="start">
        {/* Render the Calendar with dynamically determined props */}
        <Calendar {...calendarProps} />

        {/* Add a clear button */}
        {dateFilter.day || dateFilter.month || dateFilter.year ? ( // Show clear button if any date part is set in parent state
          <div className="p-2">
            <Button
              variant="outline" // Use outline variant
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
