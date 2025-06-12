// app/api/logout-beacon/route.js
import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { getBackendUrl } from "@/lib/getBackendUrl";

const BACKEND_URL =getBackendUrl();

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const headersList = await headers();

    const accessToken = cookieStore.get("access_token")?.value;
    const userAgent = headersList.get("user-agent") || "Unknown";

    if (!accessToken) {
      return NextResponse.json(
        { success: false, message: "No token found" },
        { status: 401 }
      );
    }

    // Call backend logout endpoint
    const response = await fetch(
      `${BACKEND_URL}/api/client-auth/client-logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": userAgent,
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      }
    );

    const result = await response.json();

    if (result.success) {
      // Clear the cookie
      cookieStore.delete("access_token");

      return NextResponse.json(
        { success: true, message: "Logout successful" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: result.message || "Logout failed" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Beacon logout error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
