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
if (!Promise.withResolvers) {
  Promise.withResolvers = function () {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  };
}
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

  // Memoized filter parameters with page
  const filterParams = useMemo(
    () => ({
      complaintNumber,
      status,
      dateFilter,
      clientName,
      page,
    }),
    [complaintNumber, status, dateFilter, clientName, page, bighil]
  );

  // Active filters calculation
  useEffect(() => {
    const filters = [];
    if (complaintNumber) filters.push("complaintNumber");
    if (status) filters.push("Status");
    if (dateFilter.day || dateFilter.month || dateFilter.year)
      filters.push("Date");
    if (clientName) filters.push("Client");
    setActiveFilters(filters);
  }, [complaintNumber, status, dateFilter, clientName, bighil]);

  const debouncedSearch = useCallback(
    debounce(async (params) => {
      if (!token) return;

      try {
        const queryParams = new URLSearchParams();
        let shouldResetPage = false;
        // Basic filters
        if (params.complaintNumber) {
          queryParams.append("complaintId", params.complaintNumber);
          shouldResetPage = true;
        }
        if (params.status && params.status !== "all") {
          queryParams.append("status", params.status);
          shouldResetPage = true;
        }
        if (params.clientName) {
          queryParams.append("companyName", params.clientName);
          shouldResetPage = true;
        }
        queryParams.append("page", params.page.toString());

        // Date filter handling
        const { type, day, month, year } = params.dateFilter || {};
        if (type === "day" && day && day !== "allDay") {
          queryParams.append("day", day);
          shouldResetPage = true;
        }
        if (month && month !== "anyMonth") {
          queryParams.append("month", month);
          shouldResetPage = true;
        }
        if (year && year !== "anyYear") {
          queryParams.append("year", year);
          shouldResetPage = true;
        }

        // API call
        const url = getBackendUrl();
        const res = await fetchData(
          bighil
            ? `${url}/api/bighil/get-filtered-complaints?${queryParams.toString()}`
            : `${url}/api/client/get-filtered-complaints?${queryParams.toString()}`,
          "GET",
          null,
          token
        );

        if (res?.data) {
          setComplaints(res.data.complaints);
          setTotalComplaints(res.data.totalCount || res.data.complaints.length);
          setResponse(res.data);
        }

        // Update URL with correct page
        window.history.replaceState(
          {},
          "",
          `${window.location.pathname}?${queryParams.toString()}`
        );
      } catch (err) {
        console.log("Error fetching complaints:", err);
      }
    }, 300),
    [token, bighil]
  );
  // Search effect with initial load handling
  useEffect(() => {
    if (!token) return;

    // Handle initial load
    if (initialMount.current) {
      initialMount.current = false;
      debouncedSearch(filterParams);
      return;
    }

    // Subsequent searches
    const handler = setTimeout(() => debouncedSearch(filterParams), 100);
    return () => {
      clearTimeout(handler);
      debouncedSearch.cancel();
    };
  }, [filterParams, debouncedSearch, token, bighil]);

  // Clear filters
  const handleClearFilters = useCallback(() => {
    setComplaintNumber("");
    setStatus("");
    setDateFilter({ type: "day", day: "", month: "", year: "" });
    setClientName("");
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

  return (
    <div className="space-y-6 p-4 max-w-7xl mx-auto">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Complaint Management
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Search and filter complaints across the platform
        </p>
      </div>

      {/* Filter Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Complaint Number Filter */}
        <FilterCard
          icon={
            <HashIcon className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400 animate-pulse" />
          }
          title="Complaint Number"
          titleColor="text-blue-600 dark:text-blue-400"
          className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-blue-800/10
               hover:shadow-lg hover:shadow-blue-500/20 dark:hover:shadow-blue-400/10
               border border-blue-100 dark:border-blue-800/50
               transition-all duration-300 ease-in-out
               backdrop-blur-sm
               group"
        >
          <TextFilter
            value={complaintNumber}
            onChange={(e) => setComplaintNumber(e.target.value)}
            placeholder="e.g. BIG-0001"
            Icon={Search}
            className="focus-within:ring-2 focus-within:ring-blue-500/50 
                 bg-white/50 dark:bg-blue-900/20
                 group-hover:bg-white dark:group-hover:bg-blue-900/30 hover:rounded-xl"
          />
        </FilterCard>

        {/* Status Filter */}
        <FilterCard
          icon={
            <FilterIcon className="h-5 w-5 mr-2 text-purple-500 dark:text-purple-400" />
          }
          title="Status"
          titleColor="text-purple-600 dark:text-purple-400"
          className="bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-purple-800/10
               hover:shadow-lg hover:shadow-purple-500/20 dark:hover:shadow-purple-400/10
               border border-purple-100 dark:border-purple-800/50
               transition-all duration-300 ease-in-out
               backdrop-blur-sm
               group"
        >
          <StatusFilter
            value={status}
            onChange={setStatus}
            className="focus-within:ring-2 focus-within:ring-purple-500/50
                 bg-white/50 dark:bg-purple-900/20
                 group-hover:bg-white dark:group-hover:bg-purple-900/30"
          />
        </FilterCard>

        {/* Date Filter */}
        <FilterCard
          icon={
            <Calendar1 className="h-5 w-5 mr-2 text-green-500 dark:text-green-400" />
          }
          title="Date Filter"
          titleColor="text-green-600 dark:text-green-400"
          className="bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-green-800/10
               hover:shadow-lg hover:shadow-green-500/20 dark:hover:shadow-green-400/10
               border border-green-100 dark:border-green-800/50
               transition-all duration-300 ease-in-out
               backdrop-blur-sm
               group"
        >
          <DateFilter
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
            className="focus-within:ring-2 focus-within:ring-green-500/50
                 bg-white/50 dark:bg-green-900/20
                 group-hover:bg-white dark:group-hover:bg-green-900/30"
          />
        </FilterCard>

        {/* Client Name Filter */}
        {bighil && (
          <FilterCard
            icon={
              <RiHomeOfficeFill className="h-5 w-5 mr-2 text-amber-500 dark:text-amber-400" />
            }
            title="Client Name"
            titleColor="text-amber-600 dark:text-amber-400"
            className="bg-gradient-to-br from-amber-50 to-white dark:from-amber-900/20 dark:to-amber-800/10
                 hover:shadow-lg hover:shadow-amber-500/20 dark:hover:shadow-amber-400/10
                 border border-amber-100 dark:border-amber-800/50
                 transition-all duration-300 ease-in-out
                 backdrop-blur-sm
                 group"
          >
            <TextFilter
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Search company"
              Icon={Search}
              className="focus-within:ring-2 focus-within:ring-amber-500/50
                   bg-white/50 dark:bg-amber-900/20
                   group-hover:bg-white dark:group-hover:bg-amber-900/30 hover:rounded-xl"
            />
          </FilterCard>
        )}
      </div>

      <ActiveFilters
        activeFilters={activeFilters}
        onClear={handleClearFilters}
      />

      <div className="flex justify-between items-center">
        <ResultsCount showing={complaints.length} total={totalComplaints} />
        {/* Export Button */}
        <Button
          onClick={handleExport}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
        >
          Export to CSV
        </Button>
      </div>
      {!error ? (
        <div className=" flex flex-col gap-3">
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
        <div className=" font-bold text-lg text-center text-red-500">
          <h1>{error}</h1>
        </div>
      )}
    </div>
  );
};

export default ComplaintFilter;
