import { getBackendUrl } from "@/lib/getBackendUrl";
import { getToken } from "@/lib/getToken";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export async function fetchServerSideData(endpoint, options = {}) {
  const token = await getTokenWithRetry(
    options.maxRetries || 10,
    options.retryDelay || 1000
  );

  // ✅ If no valid token after retry, redirect or throw
  if (!token) {
    console.error("Invalid token format:", token);
    redirect("/"); // Or throw new Error("Invalid token format")
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  const config = {
    method: options.method || "GET",
    headers,
    cache: options.cache || "no-cache",
    ...(options.body && { body: JSON.stringify(options.body) }),
  };

  try {
    const url = getBackendUrl();
    const response = await fetch(`${url}${endpoint}`, config);

    if (!response.ok) {
      console.error("Fetch failed:", response.statusText);
      // redirect("/");
    }

    const res = await response.json();

    if (!res.data) {
      throw new Error(res.message || "No data returned from API");
    }

    return res.data;
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
}

async function getTokenWithRetry(maxRetries = 10, delay = 1000) {
  let retries = 0;

  while (retries < maxRetries) {
    const token = await getToken();

    // ✅ Validate token format (basic check for JWT)
    if (token && token.split(".").length === 3) {
      return token;
    }

    retries++;
    if (retries < maxRetries) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  return null;
}
