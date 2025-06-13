"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";

import {
  Search,
  HashIcon,
  FilterIcon,
  Calendar1,
  HomeIcon,
} from "lucide-react";
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
import DepartmentFilter from "./DepartmentFilter";
import useNotificationStore from "@/store/notificationStore";

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
  const [department, setDepartment] = useState("");
  const { userRole } = useNotificationStore();
  const [clientName, setClientName] = useState("");
  const searchParams = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const initialMount = useRef(true);
  const [complaints, setComplaints] = useState([]);
  const [totalComplaints, setTotalComplaints] = useState(0);
  const [activeFilters, setActiveFilters] = useState([]);
  const [response, setResponse] = useState(null);

  const { token } = useAccessToken();
  const { loading, fetchData, error } = useFetch();
  const filterParams = useMemo(
    () => ({
      complaintNumber,
      status,
      department,
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
    [complaintNumber, status, dateFilter, clientName, page, bighil, department] // Dependencies for memoization
  );

  // Active filters calculation
  useEffect(() => {
    const filters = [];
    if (complaintNumber) filters.push("complaintNumber");
    if (status) filters.push("Status");
    if (department) filters.push("Department");
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
        if (params.department) {
          queryParams.append("department", params.department);
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
            queryParams.append("day", dateDay);
            queryParams.append("month", dateMonth); // Month is also needed for day filter
          }

          if (dateType === "month" && dateMonth && dateMonth !== "anyMonth") {
            queryParams.append("month", dateMonth);
          }
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
          setComplaints([]);
          setTotalComplaints(0);
          setResponse(null);
        }

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
    }, 300),
    [token, bighil]
  );

  useEffect(() => {
    if (!token) return;

    const isAnyFilterActiveExcludingPage =
      filterParams.complaintNumber !== "" ||
      (filterParams.status !== "" && filterParams.status !== "all") ||
      filterParams.clientName !== "" ||
      filterParams.department !== "" ||
      filterParams.dateFilter.valid;

    if (isAnyFilterActiveExcludingPage && page !== 1) {
      setPage(1);

      return;
    }

    debouncedSearch(filterParams);

    return () => {
      debouncedSearch.cancel();
    };
  }, [filterParams, debouncedSearch, token]);

  // Clear filters
  const handleClearFilters = useCallback(() => {
    setComplaintNumber("");
    setStatus("");
    setDepartment("");

    setDateFilter({ type: "day", day: "", month: "", year: "" });
    setClientName("");

    setPage(1);
  }, []);

  const handleExport = async () => {
    try {
      await handleServerExport(token, filterParams, bighil);
    } catch (error) {
      console.error("Export error:", error);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDateTypeChange = useCallback(
    (type) => {
      setDateFilter({
        type,
        day: "",
        month: "",
        year: "",
      });
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
            userRole={userRole}
            className="bg-white/90 focus:bg-white
              
               transition-shadow duration-200"
          />
        </FilterCard>
        <FilterCard
          icon={<HomeIcon className="h-5 w-5 mr-2 text-text_color" />}
          title="Department"
          titleColor="text-text_color"
          className="bg-gray/10 hover:bg-gray-bg-subtle/80
             border-2 border-gray/50
             shadow-sm hover:shadow-gray/20
             backdrop-blur-lg transition-all
             hover:translate-y-[-2px]"
        >
          <DepartmentFilter
            value={department}
            onChange={setDepartment}
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
          size="sm"
          onClick={handleExport}
          className="w-fit justify-end bg-primary hover:bg-primary/80 text-white   rounded-md"
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
