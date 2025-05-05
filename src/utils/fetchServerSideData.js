import { getBackendUrl } from "@/lib/getBackendUrl";
import { getToken } from "@/lib/getToken";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export async function fetchServerSideData(endpoint, options = {}) {
  const token = await getTokenWithRetry(
    options.maxRetries || 3,
    options.retryDelay || 1000
  );

  if (!token) {
    redirect("/");
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
      redirect("/");
    }

    const res = await response.json();
    return res.data;
  } catch (error) {
    console.log("Failed to fetch data:", error);
    redirect("/");
  }
}
async function getTokenWithRetry(maxRetries = 3, delay = 1000) {
  let retries = 0;

  while (retries < maxRetries) {
    const token = await getToken();
    if (token) return token;

    retries++;
    if (retries < maxRetries) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  return null;
}
