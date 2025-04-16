export const dynamic = "force-dynamic";
import Bighil_Client_Dialog from "@/components/UI_Components/Bighil Components/bighil dashboard components/Bighil_Client_Dialog";
import Clients_Table from "@/components/UI_Components/Bighil Components/bighil dashboard components/Clients_Table";
import { fetchServerData } from "@/lib/fetchServerSidedata";
export default async function Bighil_Clients_Page() {
  let errorMessage = null;
  let clients = [];

  try {
    clients = await fetchServerData("/api/bighil-clients//get-all-clients", {
      method: "GET",
      cache: "no-cache",
    });
  } catch (error) {
    console.error("Client fetch error:", error);
    errorMessage = error?.message || "Failed to load client information";
  }
  return (
    <div className="text-black p-6 relative">
      <Clients_Table clients={clients} />
    </div>
  );
}
