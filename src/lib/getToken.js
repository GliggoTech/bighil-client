"use server";
import { cookies } from "next/headers";

export async function getToken() {
  const token = await cookies();

  return token.get("access_token")?.value;
}
