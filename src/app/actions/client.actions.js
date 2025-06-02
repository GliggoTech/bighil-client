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

    const {
      success,
      user,
      message,
      token,
      requiresTwoFactor,
      deviceId,
      hasActiveSessionsOnOtherDevices,
      activeSessions,
    } = await res.json();

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

    return {
      success,
      user,
      message,
      requiresTwoFactor,
      deviceId,
      hasActiveSessionsOnOtherDevices,
      activeSessions,
    }; // plain object only
  } catch (error) {
    console.error(error);
    return { success: false, message: "Login error." };
  }
}

export async function clientLogout(deviceId) {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("access_token")?.value || null;
    const res = await fetch(`${url}/api/client-auth/client-logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ deviceId }),

      credentials: "include",
    });

    const { success, message } = await res.json();
    if (success) {
      const cookieStore = await cookies();

      cookieStore.delete("access_token");
      return { success: true, message };
    } else {
      return { success: false, message };
    }
  } catch (error) {
    console.error("Signout Error:", error);
    return { success: false, message: "Failed to sign out." }; // Error handling
  }
}

export async function twoFactorVerification(verificationData) {
  console.log(verificationData);
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

export async function removeOtherLoggedinDevicesWithoutOtp(data) {
  try {
    const res = await fetch(
      `${url}/api/client-auth/client-logout-other-devices`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),

        credentials: "include",
      }
    );

    const { success, message } = await res.json();
    if (success) {
      const cookieStore = await cookies();

      cookieStore.delete("access_token");
      return { success, message };
    } else {
      return { success: false, message };
    }
  } catch (error) {
    return { success: false, message: "Logout error." };
  }
}
