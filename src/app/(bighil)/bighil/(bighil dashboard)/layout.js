import { Geist, Geist_Mono } from "next/font/google";
import "../../../globals.css";

import Bighil_Sidebar from "@/components/UI_Components/Bighil Components/Bighil_Sidebar";
import Bighil_Navbar from "@/components/UI_Components/Bighil Components/Bighil_Navbar";
import { Toaster } from "@/components/ui/toaster";
import { SocketProvider } from "@/context/socketContext";
import { getToken } from "@/lib/getToken";
import { redirect } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bighil Dashboard",
  description:
    "Manage complaints, users, and insights all in one place with the Bighil Admin Dashboard.",
};

export default async function BighilDashboard_Layout({ children }) {
  const token = await getToken();
  if (!token) {
    redirect("/");
  }
  return (
    <SocketProvider>
      <div className="flex h-screen overflow-auto">
        {/* Sidebar component for navigation */}
        <Bighil_Sidebar />
        <div className="flex-1 flex flex-col">
          {/* Navbar component displaying session information */}
          <Bighil_Navbar />
          <main className="flex-1 overflow-auto">
            {/* Main content area where child components will be rendered */}
            {children}
            <Toaster position="top-right" richColors />
          </main>
        </div>
      </div>
    </SocketProvider>
  );
}
