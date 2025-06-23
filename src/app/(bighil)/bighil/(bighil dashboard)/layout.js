import "../../../globals.css";

import { SocketProvider } from "@/context/socketContext";
import { getToken } from "@/lib/getToken";
import { redirect } from "next/navigation";
import BighilLayoutWrapper from "@/components/UI_Components/Bighil Components/BighilLayoutWrapper";

export const metadata = {
  title: "Bighil Dashboard",
  description:
    "Manage complaints, users, and insights all in one place with the Bighil Admin Dashboard.",
};

export default async function BighilDashboard_Layout({ children }) {
 

  return (
    <SocketProvider>
      <BighilLayoutWrapper>{children}</BighilLayoutWrapper>
    </SocketProvider>
  );
}
