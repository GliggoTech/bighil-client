export const apiClient = {
  async request(
    url,
    method = "GET",
    body = null,
    token = null,
    isMedia = false
  ) {
    const headers = new Headers();

    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    }

    if (!isMedia && method !== "GET") {
      headers.append("Content-Type", "application/json");
    }

    const config = {
      method: method.toUpperCase(),
      headers,
      credentials: "include",
    };

    // Handle body exactly like your useFetch
    if (method !== "GET") {
      config.body = isMedia ? body : body ? JSON.stringify(body) : null;
    }

    const response = await fetch(url, config);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || "Request failed");
    }

    return data;
  },
};
