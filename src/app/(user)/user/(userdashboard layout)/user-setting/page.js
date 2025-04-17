import SettingComponent from "@/components/UI_Components/Standard_Components/SettingComponent";
import { fetchServerData } from "@/lib/fetchServerSideData";

import { Suspense } from "react";

export default async function Bighil_Setting_Page() {
  const endPoint = "/api/setting/get-setting";
  const data = await fetchServerData(`${endPoint}`, {
    method: "GET",
    cache: "no-cache",
  });

  return (
    <div>
      <Suspense>
        <SettingComponent data={data} />
      </Suspense>
    </div>
  );
}
