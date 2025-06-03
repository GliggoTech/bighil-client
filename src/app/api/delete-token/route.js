// src/app/api/delete-token/route.js
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("access_token");

    return NextResponse.json({
      success: true,
      message: "Token deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to delete token",
      error,
    });
  }
}
