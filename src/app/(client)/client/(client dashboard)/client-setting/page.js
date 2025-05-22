import SettingComponent from "@/components/UI_Components/Standard_Components/SettingComponent";
import { fetchServerSideData } from "@/utils/fetchServerSideData";

export default async function ClientSettingPage() {
  const endPoint = "/api/client-setting/get-client-setting";
  const data = await fetchServerSideData(`${endPoint}`, {
    method: "GET",
    cache: "no-cache",
  });
 
  return (
    <div>
      <SettingComponent initialData={data} />
    </div>
  );
}
