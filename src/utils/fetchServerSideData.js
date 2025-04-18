import { getBackendUrl } from "@/lib/getBackendUrl";
import { getToken } from "@/lib/getToken";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export async function fetchServerSideData(endpoint, options = {}) {
  // Get authentication token with retry logic
  const token = await getTokenWithRetry(
    options.maxRetries || 3,
    options.retryDelay || 1000
  );

  // If no token after retries, redirect to login or return error
  if (!token) {
    console.error("Authentication token not available after retries");
    if (options.redirectOnNoToken !== false) {
      redirect("/");
    }
    throw new Error("Authentication token required for API call");
  }

  // Set headers with token
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  // Configure fetch
  const config = {
    method: options.method || "GET",
    headers,
    cache: options.cache || "no-cache",
    ...(options.body && { body: JSON.stringify(options.body) }),
  };

  try {
    const url = getBackendUrl();
    const response = await fetch(`${url}${endpoint}`, config);

    if (response.status !== 200) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Request failed");
    }

    const res = await response.json();
    return res.data;
  } catch (error) {
    console.error("Server fetch error:", error.message);

    if (
      error.message === "Insufficient permissions" ||
      error.message === "Invalid token" ||
      error.message === "Unauthorized"
    ) {
      redirect("/");
    }

    throw error;
  }
}

/**
 * Helper function to get a token with retry logic
 * @param {number} maxRetries - Maximum number of retry attempts
 * @param {number} delay - Delay between retries in milliseconds
 * @returns {Promise<string|null>} - The authentication token or null
 */
async function getTokenWithRetry(maxRetries = 3, delay = 1000) {
  let retries = 0;

  while (retries < maxRetries) {
    const token = await getToken();

    if (token) {
      return token;
    }

    console.log(
      `Token not available, retrying (${retries + 1}/${maxRetries})...`
    );
    retries++;

    if (retries < maxRetries) {
      // Wait before next retry
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  return null; // Return null if token is still not available after all retries
}
