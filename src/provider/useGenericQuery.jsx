"use client";
import { useQuery } from '@tanstack/react-query';
import { apiClient } from './api-client';


export const useGenericQuery = (
  queryKey, 
  url, 
  token, 
  options = {}
) => {
  return useQuery({
    queryKey: [queryKey, url, token],
    queryFn: async () => {
      return await apiClient.request(url, 'GET', null, token, false);
    },
    enabled: !!token && !!url,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    ...options,
  });
};