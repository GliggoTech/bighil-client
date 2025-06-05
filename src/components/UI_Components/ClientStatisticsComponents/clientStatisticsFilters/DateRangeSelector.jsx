"use client";

import React, { useState } from "react";
import { Calendar } from "lucide-react";
import { format } from "date-fns";

const DateRangeSelector = ({ onDateChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    from: new Date(2025, 0, 1),
    to: new Date(2025, 5, 30),
  });

  const handleDateSelect = (range) => {
    setDateRange(range);
    if (range?.from && range?.to) {
      onDateChange?.(range);
      setIsOpen(false);
    }
  };

  return (
    <div className="mb-6">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
        >
          <Calendar className="h-4 w-4" />
          <span className="text-sm">
            {dateRange?.from && dateRange?.to
              ? `${format(dateRange.from, "MMM dd, yyyy")} - ${format(
                  dateRange.to,
                  "MMM dd, yyyy"
                )}`
              : "Select date range"}
          </span>
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10 w-full md:w-96">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  From Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  value={
                    dateRange?.from ? format(dateRange.from, "yyyy-MM-dd") : ""
                  }
                  onChange={(e) =>
                    handleDateSelect({
                      ...dateRange,
                      from: new Date(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  To Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  value={
                    dateRange?.to ? format(dateRange.to, "yyyy-MM-dd") : ""
                  }
                  onChange={(e) =>
                    handleDateSelect({
                      ...dateRange,
                      to: new Date(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDateSelect(dateRange)}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateRangeSelector;
