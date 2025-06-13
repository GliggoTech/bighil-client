import "../../../globals.css";
import { getToken } from "@/lib/getToken";
import { redirect } from "next/navigation";
import { SocketProvider } from "@/context/socketContext";
import ClientLayoutWrapper from "@/components/UI_Components/Client components/ClientLayoutWrapper";
import TabCloseLogout from "@/custom hooks/useTabCloseLogout";

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
      <ClientLayoutWrapper>
        {/* <TabCloseLogout /> */}
        {children}
      </ClientLayoutWrapper>
    </SocketProvider>
  );
}
