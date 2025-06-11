"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { debounce } from "lodash";
import { getBackendUrl } from "@/lib/getBackendUrl";
import useAccessToken from "@/custom hooks/useAccessToken";
import useFetch from "@/custom hooks/useFetch";

const SearchClients = ({ initialClients, onClientsUpdate }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const { fetchData, error } = useFetch();
  const { token } = useAccessToken();

  // Use refs to maintain stable references
  const initialClientsRef = useRef(initialClients);
  const onClientsUpdateRef = useRef(onClientsUpdate);

  // Update refs when props change
  useEffect(() => {
    initialClientsRef.current = initialClients;
    onClientsUpdateRef.current = onClientsUpdate;
  }, [initialClients, onClientsUpdate]);

  // Create a stable debounced search function
  const debouncedSearch = useCallback(
    debounce(async (term) => {
      if (!term.trim()) {
        // If search is empty, show initial clients
        onClientsUpdateRef.current(initialClientsRef.current);
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      const url = getBackendUrl();
      setIsSearching(true);

      try {
      
        const res = await fetchData(
          `${url}/api/bighil-clients/clients/search?q=${encodeURIComponent(
            term.trim()
          )}`,
          "GET",
          {},
          token,
          false
        );

        if (res?.success) {
          setSearchResults(res.data || []);
          onClientsUpdateRef.current(res.data || []);
        } else {
          console.error("Search API returned error:", res?.message);
          setSearchResults([]);
          onClientsUpdateRef.current([]);
        }
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
        onClientsUpdateRef.current([]);
      } finally {
        setIsSearching(false);
      }
    }, 500),
    [fetchData, token] // Only include stable dependencies
  );

  // Effect to trigger search when searchTerm changes
  useEffect(() => {
    debouncedSearch(searchTerm);

    // Cleanup function to cancel pending debounced calls
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  // Handle input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    onClientsUpdateRef.current(initialClientsRef.current);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary dark:text-text-text_color/70" />
        <Input
          type="text"
          placeholder="Search clients by company name or location..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="pl-10 pr-10 w-full"
          //   disabled={isSearching}
        />
        {searchTerm && !isSearching && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            type="button"
          >
            <X className="h-3 w-3 text-text-secondary dark:text-text-text_color/70" />
          </button>
        )}
        {isSearching && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchClients;
