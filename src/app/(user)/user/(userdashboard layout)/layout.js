import "../../../globals.css";
import UserNavbar from "@/components/UI_Components/USER_Components/USER_Dashboard_Components/UserNabar";

import { SocketProvider } from "@/context/socketContext";
import { Toaster } from "@/components/ui/toaster";
import { PortalFooter } from "@/components/UI_Components/PUBLIC_Components/PortalFooter";
import { getToken } from "@/lib/getToken";
import { redirect } from "next/navigation";
import { QueryProvider } from "@/provider/QueryProvider";

export const metadata = {
  title: "Bighil | User Dashboard",
  description:
    "Access your complaint history, manage responses, and stay updated from your personalized Bighil user dashboard.",
};

export default async function UserDashboard_Layout({ children }) {
  const token = await getToken();
  if (!token) {
    redirect("/");
  }
  return (
    <QueryProvider>
      <SocketProvider>
        <Toaster position="top-right" richColors />
        <UserNavbar />
        <div className="bg-bighil_dashboard_bg ">{children}</div>
        {/* <PortalFooter /> */}
      </SocketProvider>
    </QueryProvider>
  );
}
