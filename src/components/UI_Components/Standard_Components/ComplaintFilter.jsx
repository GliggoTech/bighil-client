"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";

import { Search, HashIcon, FilterIcon, Calendar1 } from "lucide-react";
import { debounce } from "lodash";
import ComplaintsTable from "./ComplaintsTable";
import useFetch from "@/custom hooks/useFetch";
import useAccessToken from "@/custom hooks/useAccessToken";
import { getBackendUrl } from "@/lib/getBackendUrl";
import PaginationControls from "./PaginationControls";
import { useSearchParams } from "next/navigation";

import FilterCard from "../Client components/client dashboard components/admin complaint filter components/FilterCard";
import TextFilter from "../Client components/client dashboard components/admin complaint filter components/TextFilter";
import StatusFilter from "../Client components/client dashboard components/admin complaint filter components/StatusFilter";
import ActiveFilters from "../Client components/client dashboard components/admin complaint filter components/ActiveFilters";
import ResultsCount from "../Client components/client dashboard components/admin complaint filter components/ResultsCount";
import { RiHomeOfficeFill } from "react-icons/ri";
import DateFilter from "../Client components/client dashboard components/admin complaint filter components/date filter components/DateFilter";
import { Button } from "@/components/ui/button";
import { handleServerExport } from "@/utils/exportUtils";
import DateTypeSelector from "../Client components/client dashboard components/admin complaint filter components/date filter components/DateTypeSelector";
import CalendarDateFilter from "./CalendarDateFilter";
import { isValid, parseISO } from "date-fns";
import { format } from "date-fns";

const ComplaintFilter = ({ bighil = false }) => {
  // Filter states
  const [complaintNumber, setComplaintNumber] = useState("");
  const [status, setStatus] = useState("");
  const [dateFilter, setDateFilter] = useState({
    type: "day",
    day: "",
    month: "",
    year: "",
  });
  const [clientName, setClientName] = useState("");
  const searchParams = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const initialMount = useRef(true);
  const [complaints, setComplaints] = useState([]);
  const [totalComplaints, setTotalComplaints] = useState(0);
  const [activeFilters, setActiveFilters] = useState([]);
  const [response, setResponse] = useState(null);

  const token = useAccessToken();
  const { loading, fetchData, error } = useFetch();
  const filterParams = useMemo(
    () => ({
      complaintNumber,
      status,
      dateFilter: {
        ...dateFilter,
        // Recalculate validity based on current dateFilter state
        valid: (() => {
          switch (dateFilter.type) {
            case "day":
              // Valid if day, month, and year are non-empty and not 'any' placeholders
              return (
                !!dateFilter.day &&
                dateFilter.day !== "allDay" &&
                !!dateFilter.month &&
                dateFilter.month !== "anyMonth" &&
                !!dateFilter.year &&
                dateFilter.year !== "anyYear"
              );
            case "month":
              // Valid if month and year are non-empty and not 'any' placeholders
              return (
                !!dateFilter.month &&
                dateFilter.month !== "anyMonth" &&
                !!dateFilter.year &&
                dateFilter.year !== "anyYear"
              );
            case "year":
              // Valid if year is non-empty and not 'any' placeholder
              return !!dateFilter.year && dateFilter.year !== "anyYear";
            default:
              return false; // Should not happen if type is one of the above
          }
        })(),
      },
      clientName,
      page, // Include page in filterParams
    }),
    [complaintNumber, status, dateFilter, clientName, page, bighil] // Dependencies for memoization
  );

  // Active filters calculation
  useEffect(() => {
    const filters = [];
    if (complaintNumber) filters.push("complaintNumber");
    if (status) filters.push("Status");
    // Check validity from filterParams directly
    if (filterParams.dateFilter.valid) {
      let dateLabel = "Date";
      // Format the date label based on the valid date filter parts
      const { type, day, month, year } = filterParams.dateFilter;
      try {
        if (type === "day" && day && month && year) {
          // Attempt to parse to format nicely, fallback to string
          const dateObj = parseISO(
            `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
              2,
              "0"
            )}`
          );
          dateLabel += `: ${
            isValid(dateObj)
              ? format(dateObj, "PPP")
              : `${year}-${month}-${day}`
          }`;
        } else if (type === "month" && month && year) {
          const dateObj = parseISO(`${year}-${String(month).padStart(2, "0")}`);
          dateLabel += `: ${
            isValid(dateObj) ? format(dateObj, "MMMM yyyy") : `${year}-${month}`
          }`;
        } else if (type === "year" && year) {
          dateLabel += `: ${year}`;
        }
      } catch (e) {
        console.error("Error formatting active date filter label:", e);
        dateLabel += `: Invalid Date`; // Indicate formatting error
      }
      if (dateLabel !== "Date") {
        // Only push if a specific date part was formatted
        filters.push(dateLabel);
      }
    }
    if (clientName) filters.push("Client");
    setActiveFilters(filters);
  }, [filterParams]);

  const debouncedSearch = useCallback(
    // Use filterParams from the latest render within the debounce closure
    debounce(async (params) => {
      console.log(params);
      if (!token) return;
      try {
        const queryParams = new URLSearchParams();
        // Append filter parameters only if they have a meaningful value
        if (params.complaintNumber) {
          queryParams.append("complaintId", params.complaintNumber);
        }
        if (params.status && params.status !== "all") {
          queryParams.append("status", params.status);
        }
        if (params.clientName) {
          queryParams.append("companyName", params.clientName);
        }
        // Date filter handling - append parameters only if the selection is valid for the current type
        const {
          type: dateType,
          day: dateDay,
          month: dateMonth,
          year: dateYear,
          valid: isDateValid,
        } = params.dateFilter;
        if (isDateValid) {
          if (dateYear && dateYear !== "anyYear") {
            console.log(" only");
            // Year is required for all valid types
            queryParams.append("year", dateYear);
          }
          // Append day and month only if the type is 'day' and they are selected
          if (
            dateType === "day" &&
            dateDay &&
            dateDay !== "allDay" &&
            dateMonth &&
            dateMonth !== "anyMonth"
          ) {
            console.log("day and month");
            queryParams.append("day", dateDay);
            queryParams.append("month", dateMonth); // Month is also needed for day filter
          }
          // Append month only if the type is 'month' and it is selected
          if (dateType === "month" && dateMonth && dateMonth !== "anyMonth") {
            console.log("month only");
            queryParams.append("month", dateMonth);
          }
          // If type is year, only year is appended (handled above)
        }
        // Always append the current page from state
        queryParams.append("page", params.page.toString());
        // Build URL
        const url = getBackendUrl();
        const finalUrl = bighil
          ? `${url}/api/bighil/get-filtered-complaints?${queryParams.toString()}`
          : `${url}/api/client/get-filtered-complaints?${queryParams.toString()}`;
        // Fetch data
        const res = await fetchData(finalUrl, "GET", null, token);
        if (res?.data) {
          setComplaints(res.data.complaints);
          // Use totalCount from response if available, otherwise fallback
          setTotalComplaints(
            res.data.totalCount ??
              res.data.pagination?.total ??
              res.data.complaints.length
          );
          setResponse(res.data); // Store the full response for pagination info
        } else {
          // Handle case where res or res.data is null/undefined
          setComplaints([]);
          setTotalComplaints(0);
          setResponse(null);
        }
        // Update URL search params based on the *actual parameters sent to the API*
        // This ensures the URL reflects the state that produced the current results.
        window.history.replaceState(
          {},
          "",
          `${window.location.pathname}?${queryParams.toString()}`
        );
      } catch (err) {
        console.error("Error fetching complaints:", err);
        // Optionally reset complaints/totalComplaints/response on error
        setComplaints([]);
        setTotalComplaints(0);
        setResponse(null);
      }
    }, 300), // Debounce delay (300ms after last filter change)
    [token, bighil] // Dependencies for useCallback - only re-create if token or bighil changes
    // DO NOT include filterParams here, as that would recreate the debounced function
    // every time filters change, defeating the debounce. The latest filterParams
    // will be captured when the debounced function actually runs.
  );
  // Search effect with initial load handling
  // Effect to trigger search when filterParams or page changes
  useEffect(() => {
    if (!token) return;
    // Determine if any filter is active (excluding page)
    const isAnyFilterActiveExcludingPage =
      filterParams.complaintNumber !== "" ||
      (filterParams.status !== "" && filterParams.status !== "all") ||
      filterParams.clientName !== "" ||
      filterParams.dateFilter.valid;
    // If filters are active, and the current page is greater than 1, reset the page state to 1.
    // This ensures that applying a filter always takes the user back to the first page of the filtered results.
    if (isAnyFilterActiveExcludingPage && page !== 1) {
      // Set the page state to 1. This will cause `filterParams` to update,
      // which in turn will re-trigger this useEffect. The next run of the
      // effect will then proceed to call `debouncedSearch` with `page` set to 1.
      setPage(1);
      // IMPORTANT: Return early in this effect run. We don't want to trigger
      // the search with the old page number while a filter is active.
      return;
    }
    // If no filters are active OR filters are active and page is already 1,
    // or if it's the very initial load (before any user interaction changes state from defaults),
    // trigger the search with the current filterParams (which includes the current page state).
    // The debouncedSearch function will handle the delay and use the latest filterParams
    // available when it eventually executes.
    // Debounced search is triggered whenever filterParams changes (which includes page and all filters)
    // The `debouncedSearch` function itself captures the *latest* `filterParams` from the closure
    // when it finally runs after the debounce period.
    debouncedSearch(filterParams);
    // Cleanup the debounce on component unmount or effect re-run
    return () => {
      debouncedSearch.cancel();
    };
    // Dependencies for useEffect: filterParams. When any value in filterParams changes,
    // this effect runs. The logic inside determines if a page reset is needed first,
    // otherwise it calls the debounced search.
  }, [filterParams, debouncedSearch, token]);

  // Clear filters
  const handleClearFilters = useCallback(() => {
    setComplaintNumber("");
    setStatus("");
    // Reset date filter to initial state (type 'day' with empty values)
    setDateFilter({ type: "day", day: "", month: "", year: "" });
    setClientName("");
    // Reset page to 1 when filters are cleared
    setPage(1);
    // Clearing filters will update complaintNumber, status, dateFilter, clientName, and page states.
    // These state changes will cause `filterParams` to update, which triggers the useEffect,
    // and the debounced search will run with all filters cleared and page=1.
  }, []);

  const handleExport = async () => {
    try {
      await handleServerExport(token, filterParams, bighil);
    } catch (error) {
      console.error("Export error:", error);
      // Handle error state
    }
  };
  // Handle page changes from pagination controls
  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // Handle change in date filter type (Day, Month, Year)
  // This handler is likely used by the DateTypeSelector component
  const handleDateTypeChange = useCallback(
    (type) => {
      // When the type changes, reset the date parts to empty strings.
      // This ensures that switching from "Day" to "Year" doesn't keep old day/month values.
      setDateFilter({
        type, // Set the new type
        day: "",
        month: "",
        year: "",
      });
      // Setting the type and clearing date parts updates the `dateFilter` state.
      // This state change causes `filterParams` to update, triggering the useEffect.
      // If filters were active on page > 1 before this change, the useEffect will
      // first reset the page to 1 before triggering the search.
    },
    [setDateFilter]
  );
  return (
    <div className="bg-bighil_dashboard_bg min-h-screen p-2">
      <div className="flex flex-col space-y-2 ml-3">
        <h1 className="text-2xl font-medium text-text_color dark:text-white">
          Complaint Management
        </h1>
        <p className="text-text_color font-light dark:text-gray-400">
          Search and filter complaints across the platform
        </p>
      </div>

      {/* Filter Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 p-4  rounded-xl">
        {/* Complaint Number Filter */}
        <FilterCard
          icon={
            <HashIcon className="h-5 w-5 mr-2 text-primary animate-pulse" />
          }
          title="Complaint Number"
          titleColor="text-primary"
          className="bg-primary-bg-subtle hover:bg-primary-bg-subtle/80
             border-2 border-primary-border-subtle
             shadow-sm hover:shadow-primary/20
             backdrop-blur-lg transition-all
             hover:translate-y-[-2px]"
        >
          <TextFilter
            value={complaintNumber}
            onChange={(e) => setComplaintNumber(e.target.value)}
            placeholder="e.g. BIG-0001"
            Icon={Search}
            className="bg-white/90 focus:bg-white
               rounded-xl border-white
               transition-shadow duration-200"
          />
        </FilterCard>

        {/* Status Filter */}
        <FilterCard
          icon={<FilterIcon className="h-5 w-5 mr-2 text-purple" />}
          title="Status"
          titleColor="text-purple"
          className="bg-purple/10 hover:bg-purple-bg-subtle/80
             border-2 border-purple/50
             shadow-sm hover:shadow-purple/20
             backdrop-blur-lg transition-all
             hover:translate-y-[-2px]"
        >
          <StatusFilter
            value={status}
            onChange={setStatus}
            className="bg-white/90 focus:bg-white
              
               transition-shadow duration-200"
          />
        </FilterCard>

        {/* Date Filter - Use the new component */}
        <FilterCard
          icon={<Calendar1 className="h-5 w-5 mr-2 text-success" />}
          title="Date Filter"
          titleColor="text-success"
          className="bg-success-bg-subtle hover:bg-success-bg-subtle/80
             border-2 border-success-border-subtle
             shadow-sm hover:shadow-success/20
             backdrop-blur-lg transition-all
             hover:translate-y-[-2px]"
        >
          {/* Use the existing DateTypeSelector to choose filter granularity */}
          <DateTypeSelector
            value={dateFilter.type}
            onChange={handleDateTypeChange}
          />
          {/* Use the new CalendarDateFilter for date selection */}
          {/* Pass the entire dateFilter state object and its setter */}
          <CalendarDateFilter
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
          />
        </FilterCard>

        {/* Client Name Filter */}
        {bighil && (
          <FilterCard
            icon={<RiHomeOfficeFill className="h-5 w-5 mr-2 text-warning" />}
            title="Client Name"
            titleColor="text-warning"
            className="bg-warning-bg-subtle hover:bg-warning-bg-subtle/80
               border-2 border-warning-border-subtle
               shadow-sm hover:shadow-warning/20
               backdrop-blur-lg transition-all
               hover:translate-y-[-2px]"
          >
            <TextFilter
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Search company"
              Icon={Search}
              className="bg-white/90 focus:bg-white rounded-xl border-warning/50
                 transition-shadow duration-200"
            />
          </FilterCard>
        )}
      </div>
      <div className="ml-3">
        <ActiveFilters
          activeFilters={activeFilters}
          onClear={handleClearFilters}
        />
      </div>

      <div className="flex sm:justify-between sm:items-center sm:flex-row   flex-col mt-3 ml-3">
        <ResultsCount showing={complaints.length} total={totalComplaints} />
        {/* Export Button */}
        <Button
          onClick={handleExport}
          className="w-fit justify-end bg-toast_success_bg hover:bg-toast_success_bg/80 text-text_color font-light py-2 px-4 rounded"
        >
          Export to CSV
        </Button>
      </div>
      {!error ? (
        <div className=" flex flex-col gap-3 mt-3 ml-3">
          <ComplaintsTable
            complaints={complaints}
            isLoading={loading}
            error={error}
            bighil={bighil}
          />
          {response && (
            <PaginationControls
              currentPage={response.currentPage}
              totalPages={response.totalPages}
              hasNextPage={response.hasNextPage}
              hasPreviousPage={response.hasPreviousPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      ) : (
        <div className=" font-bold text-lg text-center text-red">
          <h1>{error}</h1>
        </div>
      )}
    </div>
  );
};

export default ComplaintFilter;
