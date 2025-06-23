// app/api/logout-beacon/route.js

import { clientLogout } from "@/app/actions/client.actions";

export async function POST(request) {
  try {
    // Call your server action
    const result = await clientLogout();

    return Response.json(result, { status: 200 });
  } catch (error) {
    console.error("Logout beacon error:", error);
    return Response.json(
      { success: false, message: "Logout failed" },
      { status: 500 }
    );
  }
}
