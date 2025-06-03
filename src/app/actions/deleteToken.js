"use server";

import { cookies } from "next/headers";

export async function deleteToken() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("access_token");

    return { success: true, message: "Token deleted successfully" };
  } catch (error) {
    
    return { success: false, message: "Failed to delete token", error };
  }
}
