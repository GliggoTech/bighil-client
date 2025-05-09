import SettingComponent from "@/components/UI_Components/Standard_Components/SettingComponent";
import { fetchServerSideData } from "@/utils/fetchServerSideData";

import { Suspense } from "react";

export default async function Client_Setting_Page() {
  const endPoint = "/api/setting/get-setting";
  const data = await fetchServerSideData(`${endPoint}`, {
    method: "GET",
    cache: "no-cache",
  });

  return (
    <div>
      <SettingComponent data={data} />
      {/* <SettingsContainer data={data} />
      <ContactComponent /> */}
    </div>
  );
}
