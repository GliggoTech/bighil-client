// app/api/auth/token/route.js
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("fetching token");
  const cookieStore = await cookies();
  console.log(cookieStore);
  const token = cookieStore.get("access_token")?.value || null;

  return NextResponse.json({ token });
}
