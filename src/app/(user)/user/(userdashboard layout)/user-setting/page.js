import SettingComponent from "@/components/UI_Components/Standard_Components/SettingComponent";
import { fetchServerSideData } from "@/utils/fetchServerSideData";

export default async function UsersSettingsPage() {
  const endPoint = "/api/user-setting/get-user-setting";
  const data = await fetchServerSideData(`${endPoint}`, {
    method: "GET",
    cache: "no-cache",
  });
  console.log("Client Setting Page Data: ", data);

  return (
    <div>
      <SettingComponent initialData={data} />
    </div>
  );
}
