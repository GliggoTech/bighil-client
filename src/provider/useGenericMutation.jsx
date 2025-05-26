"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./api-client";
import { toast } from "@/hooks/use-toast";

export const useGenericMutation = (method = "POST", options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ url, body, token, isMedia = false }) => {
      return await apiClient.request(url, method, body, token, isMedia);
    },
    onSuccess: (data, variables) => {
      console.log("Mutation successful:", data, variables, options);
      // Show success toast if not disabled
      if (!options.skipSuccessToast) {
        toast({
          title: options.successTitle || "Success",
          variant: "default",
          description:
            options.successMessage || "Operation completed successfully",
        });
      }

      // Invalidate related queries if specified
      if (options.invalidateQueries) {
        options.invalidateQueries.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey });
        });
      }

      // Custom success handler
      if (options.onSuccess) {
        options.onSuccess(data, variables);
      }
    },
    onError: (error, variables) => {
      console.error("Mutation failed:", error, variables, options);
      // Show error toast if not disabled
      if (!options.skipErrorToast) {
        toast({
          title: "Error",
          variant: "destructive",
          description: error.message || "Operation failed",
        });
      }

      // Custom error handler
      if (options.onError) {
        options.onError(error, variables);
      }
    },
    ...options,
  });
};
