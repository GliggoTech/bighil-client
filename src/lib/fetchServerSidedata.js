import { redirect } from "next/navigation";
import { getBackendUrl } from "./getBackendUrl";
import { getToken } from "./getToken";

export async function fetchServerData(endpoint, options = {}) {
  // Get authentication token
  const token = await getToken();

  // Set default headers
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
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

    if (response.status != 200) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Request failed");
    }

    const res = await response.json();

    return res.data;
  } catch (error) {
    console.error("Server fetch error:", error.message);
    if (
      error.message == "Insufficient permissions" ||
      error.message == "Invalid token" ||
      error.message == "Unauthorized"
    ) {
      redirect("/");
    }
    throw error; // Uncomment this line to rethrow the error for debugging purposes.
    // throw new Error(error.message || "Failed to fetch data");
  }
}
