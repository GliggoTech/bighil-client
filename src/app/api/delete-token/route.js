// src/app/api/delete-token/route.js
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Token deleted successfully",
    });

    // Delete cookie properly using Set-Cookie header
    response.cookies.set({
      name: "access_token",
      value: "",
      path: "/",
      expires: new Date(0), // Expire the cookie
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to delete token",
      error,
    });
  }
}
