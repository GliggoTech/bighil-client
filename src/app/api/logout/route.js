// app/api/logout/route.js
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = awaitcookies();
  cookieStore.delete("access_token");

  return NextResponse.json({ success: true });
}
