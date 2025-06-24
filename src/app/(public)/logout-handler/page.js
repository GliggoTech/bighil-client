// app/logout-handler/page.js (or .tsx)
import { redirect } from "next/navigation";

export default async function LogoutHandlerPage() {
  // Call the API to delete the cookie
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`, {
    cache: "no-store",
  });

  // Redirect to login or invalid session page
  redirect("/invalid-session?role=client");
}
