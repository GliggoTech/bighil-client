"use server";

import { getBackendUrl } from "@/lib/getBackendUrl";
import { cookies } from "next/headers";
const url = getBackendUrl();
export async function clientLogin(loginData) {
  try {
    const res = await fetch(`${url}/api/client-auth/client-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

    return { success, user, message, requiresTwoFactor }; // plain object only
  } catch (error) {
    console.error(error);
    return { success: false, message: "Login error." };
  }
}

export async function clientLogout() {
  try {

    // First await cookies() to get the cookie store
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
   
    const res = await fetch(`${url}/api/client-auth/client-logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: null,
      credentials: "include",
    });
   
    const { success, message } = await res.json();
    if (success) {
      // Then use the cookie store
      cookieStore.delete("access_token");
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
    const url = getBackendUrl();
    const res = await fetch(
      `${url}/api/client-setting/login-2fa-verification`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
