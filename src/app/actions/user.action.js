"use server";

import { getBackendUrl } from "@/lib/getBackendUrl";
import { cookies } from "next/headers";

export async function userLogin(loginData) {
  try {
    const url = getBackendUrl();
    const res = await fetch(`${url}/api/user-auth/user-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
      credentials: "include", // Add credentials here
    });
    const { success, data, message, token } = await res.json();
    if (success && token) {
      cookies().set({
        name: "access_token",
        value: token,
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_NODE_DEV === "production", // true in production, false in development
        sameSite:
          process.env.NEXT_PUBLIC_NODE_DEV === "production" ? "none" : "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: "/",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });
    }
    return { success, data, message };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
export async function userSignup(signupData) {
  try {
    const url = getBackendUrl();
    const res = await fetch(`${url}/api/user-auth/user-register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
      credentials: "include",
    });

    const { success, data, message, token } = await res.json();

    if (success && token) {
      cookies().set({
        name: "access_token",
        value: token,
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_NODE_DEV === "production",
        sameSite:
          process.env.NEXT_PUBLIC_NODE_DEV === "production" ? "none" : "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });
    }

    return { success, data, message };
  } catch (error) {
    console.error("Signup Error:", error);
    throw error;
  }
}

export async function userSignout() {
  try {
    cookies().delete("access_token");

    return { success: true, message: "Signed out successfully." };
  } catch (error) {
    console.error("Signout Error:", error);
    return { success: false, message: "Failed to sign out." };
  }
}
