import { getBackendUrl } from "./getBackendUrl";

export async function markNotificationAsRead(notificationId, token, endpoint) {
  if (!notificationId || !token) return;

  try {
    const backendUrl = getBackendUrl();
    const res = await fetch(`${backendUrl}${endpoint}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ notificationId }),
    });

    // Read response body
    const data = await res.json();

    if (!res.ok) {
      console.error("Failed to mark notification as read:", data);
    }

    return data; // Return response data if needed
  } catch (error) {
    console.error("Error marking notification as read:", error);
  }
}
