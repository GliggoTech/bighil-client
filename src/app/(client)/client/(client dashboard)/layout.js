import "../../../globals.css";
import { Toaster } from "@/components/ui/toaster";
import Client_Sidebar from "@/components/UI_Components/Client components/client dashboard components/Client_Sidebar";
import Client_Navbar from "@/components/UI_Components/Client components/client dashboard components/Client_Navbar";
import { getToken } from "@/lib/getToken";
import { redirect } from "next/navigation";
import { SocketProvider } from "@/context/socketContext";
import ClientLayoutWrapper from "@/components/UI_Components/Client components/ClientLayoutWrapper";

export const metadata = {
  title: "Client Dashboard - BIGHIL",
  description: "Client dashboard for the BIGHIL platform",
};

export default async function ClientDashboard_Layout({ children }) {
  const token = await getToken();

  if (!token) {
    redirect("/");
  }

  return (
    <SocketProvider>
      <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
    </SocketProvider>
  );
}
