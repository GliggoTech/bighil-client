import SettingComponent from "@/components/UI_Components/Standard_Components/SettingComponent";
import { fetchServerSideData } from "@/lib/fetchServerSideData";
// import { fetchServerSideData } from "@/lib/fetchServerSideData";
import { Suspense } from "react";

export default async function Bighil_Setting_Page() {
  const endPoint = "/api/setting/get-setting";
  const data = await fetchServerSideData(`${endPoint}`, {
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
