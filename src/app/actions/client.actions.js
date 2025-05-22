"use server";

import { getBackendUrl } from "@/lib/getBackendUrl";
import { cookies } from "next/headers";
export async function clientLogin(loginData) {
  try {
    const url = getBackendUrl();
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

    // Then use the cookie store
    cookieStore.delete("access_token");

    return { success: true, message: "Signed out successfully." };
  } catch (error) {
    console.error("Signout Error:", error);
    return { success: false, message: "Failed to sign out." };
  }
}

export async function twoFactorVerification(verificationData) {
  console.log("Verification Data:", verificationData);
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
    return { success, user, message }; // plain object only
  } catch (error) {
    console.error(error);
    return { success: false, message: "Verification error." };
  }
}
