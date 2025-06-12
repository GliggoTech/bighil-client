// app/api/validate-session/route.js
import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import jwt from "jsonwebtoken";
import { getBackendUrl } from "@/lib/getBackendUrl";

const BACKEND_URL = getBackendUrl();

export async function GET() {
  try {
    const cookieStore = await cookies();
    const headersList = await headers();

    const accessToken = cookieStore.get("access_token")?.value;
    const userAgent = headersList.get("user-agent") || "Unknown";

    if (!accessToken) {
      return NextResponse.json(
        { success: false, message: "No token found", requiresLogin: true },
        { status: 401 }
      );
    }

    // Verify JWT token first
    try {
      jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    } catch (jwtError) {
      // Token is invalid or expired
      cookieStore.delete("access_token");
      return NextResponse.json(
        { success: false, message: "Invalid token", requiresLogin: true },
        { status: 401 }
      );
    }

    // Call backend to validate active session
    const response = await fetch(
      `${BACKEND_URL}/api/client-auth/validate-active-session`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": userAgent,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const result = await response.json();

    if (!result.success) {
      // Session is invalid on backend, clear cookie
      cookieStore.delete("access_token");
      return NextResponse.json(
        { success: false, message: result.message, requiresLogin: true },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Session valid" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Session validation error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
