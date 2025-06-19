"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function deleteToken() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("access_token");

    return { success: true, message: "Token deleted successfully" };
  } catch (error) {
    return { success: false, message: "Failed to delete token", error };
  }
}

// New function that combines token deletion with redirect
export async function deleteTokenAndRedirect(
  redirectPath = "/client/invalid-session"
) {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("access_token");
    console.log("Token deleted successfully");

    // Redirect after successful deletion
    redirect(redirectPath);
  } catch (error) {
    console.error("Failed to delete token:", error);
    // Still redirect even if deletion fails, as the session is invalid anyway
    redirect(redirectPath);
  }
}
