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
        valid: (() => {
          switch (dateFilter.type) {
            case "day":
              return (
                !!dateFilter.day && !!dateFilter.month && !!dateFilter.year
              );
            case "month":
              return !!dateFilter.month && !!dateFilter.year;
            case "year":
              return !!dateFilter.year;
            default:
              return false;
          }
        })(),
      },
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

        // if (params.dateFilter.type !== "none" && !params.dateFilter.valid) {
        //   return; // Don't search if required date fields aren't filled
        // }

        // Date filter handling
        const { type, day, month, year, valid } = params.dateFilter || {};
        if (valid) {
          if (type === "day" && day && day !== "allDay") {
            queryParams.append("day", day);
          }
          if (month && month !== "anyMonth") {
            queryParams.append("month", month);
          }
          if (year && year !== "anyYear") {
            queryParams.append("year", year);
          }
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
    [token, bighil, page]
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

        {/* Date Filter */}
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
          <DateFilter
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
            className="bg-white/90 focus:bg-white
               ring-1 ring-success-border-subtle
               focus:ring-2 focus:ring-success
               transition-shadow duration-200"
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
