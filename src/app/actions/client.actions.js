"use server";

import { getBackendUrl } from "@/lib/getBackendUrl";
import { cookies, headers } from "next/headers";

const url = getBackendUrl();

export async function clientLogin(loginData) {
  try {
    // Get user-agent from Next.js headers
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "Unknown";

    const res = await fetch(`${url}/api/client-auth/client-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": userAgent, // Forward the user-agent
      },
      body: JSON.stringify(loginData),
      credentials: "include",
    });

    const { success, user, message, token, requiresTwoFactor } =
      await res.json();

    if (success && token) {
      const cookieStore = await cookies();

      cookieStore.set("access_token", token, {
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_NODE_DEV === "production",
        sameSite:
          process.env.NEXT_PUBLIC_NODE_DEV === "production" ? "none" : "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
      });
    }

    return { success, user, message, requiresTwoFactor };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Login error." };
  }
}

export async function clientLogout() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    // Get user-agent for device tracking
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "Unknown";

    const res = await fetch(`${url}/api/client-auth/client-logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": userAgent,
        Authorization: `Bearer ${accessToken}`,
      },
      body: null,
      credentials: "include",
    });

    const { success, message } = await res.json();
    if (success) {
     
      return { success: true, message: "Signed out successfully." };
    } else {
      return { success: false, message: "Failed to sign out." };
    }
  } catch (error) {
    return { success: false, message: "Failed to sign out." };
  }
}

export async function twoFactorVerification(verificationData) {
  try {
    // Get user-agent for device tracking
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "Unknown";

    const res = await fetch(
      `${url}/api/client-setting/login-2fa-verification`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": userAgent, // Forward the user-agent
        },
        body: JSON.stringify(verificationData),
        credentials: "include",
      }
    );

    const { success, user, message, token } = await res.json();

    if (success && token) {
      const cookieStore = await cookies();

      cookieStore.set("access_token", token, {
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_NODE_DEV === "production",
        sameSite:
          process.env.NEXT_PUBLIC_NODE_DEV === "production" ? "none" : "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
      });
    }
    return { success, user, message };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Verification error." };
  }
}
