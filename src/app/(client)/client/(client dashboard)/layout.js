import "../../../globals.css";
import { Toaster } from "@/components/ui/toaster";
import Client_Sidebar from "@/components/UI_Components/Client components/client dashboard components/Client_Sidebar";
import Client_Navbar from "@/components/UI_Components/Client components/client dashboard components/Client_Navbar";
import { getToken } from "@/lib/getToken";
import { redirect } from "next/navigation";
import { SocketProvider } from "@/context/socketContext";

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
      {/* Main container with fixed height and overflow handling */}
      <div className="flex h-screen w-full overflow-hidden">
        {/* Sidebar with fixed height and scrolling */}
        <div className="h-screen flex-shrink-0">
          <Client_Sidebar />
        </div>

        {/* Content area with proper structure */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* Fixed height navbar */}
          <div className="flex-shrink-0">
            <Client_Navbar />
          </div>

          {/* Main content with scrolling */}
          <main className="flex-1 overflow-y-auto relative">
            {/* Content container with consistent padding */}
            <div className="  h-full">{children}</div>

            {/* Subtle gradient overlay at top for smooth transition from navbar */}
            {/* <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-slate-900 to-transparent pointer-events-none"></div> */}

            {/* Toast notifications */}
            <Toaster />
          </main>
        </div>
      </div>
    </SocketProvider>
  );
}
