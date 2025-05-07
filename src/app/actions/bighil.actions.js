"use server";

import { getBackendUrl } from "@/lib/getBackendUrl";
import { cookies } from "next/headers";

export async function BighilLogin(loginData) {
  try {
    const url = getBackendUrl();
    const res = await fetch(`${url}/api/bighil-auth/bighil-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    const { success, message, token, user } = await res.json();
    if (success && token) {
      // First await cookies() to get the cookie store
      const cookieStore = await cookies();

      // Then use the cookie store
      cookieStore.set({
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
    return { success, message, user };
  } catch (error) {
    return { success: false, message: "Something went wrong" };
  }
}
